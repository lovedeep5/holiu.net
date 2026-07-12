import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { IMAGE_BUCKET, FILE_BUCKET, sanitizeName, sanitizeBase } from "@/lib/media";

export const runtime = "nodejs";

// The media library is a unified view over both storage buckets — no
// separate DB table required. Uploads go directly from the browser to
// Supabase Storage via /api/admin/media/sign (see src/lib/media-upload.ts),
// bypassing Vercel's serverless function body size limit.

type MediaItem = {
  id: string;
  bucket: string;
  path: string;
  name: string;
  url: string | null;
  mimetype: string | null;
  size: number | null;
  createdAt: string | null;
  type: "image" | "file";
};

async function listBucket(
  supabase: ReturnType<typeof createServiceClient>,
  bucket: string,
  type: "image" | "file"
): Promise<MediaItem[]> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list("", { limit: 1000, sortBy: { column: "created_at", order: "desc" } });
  if (error || !data) return [];

  // Skip folder placeholders and hidden entries
  const files = data.filter((o) => o.id && !o.name.startsWith("."));

  // Resolve viewable URLs: public for images, short-lived signed for private files
  let signed: Record<string, string> = {};
  if (type === "file" && files.length) {
    const { data: s } = await supabase.storage
      .from(bucket)
      .createSignedUrls(files.map((f) => f.name), 60 * 60);
    if (s) signed = Object.fromEntries(s.map((x) => [x.path ?? "", x.signedUrl]));
  }

  return files.map((o) => {
    const meta = (o.metadata ?? {}) as { size?: number; mimetype?: string };
    let url: string | null = null;
    if (type === "image") {
      url = supabase.storage.from(bucket).getPublicUrl(o.name).data.publicUrl;
    } else {
      url = signed[o.name] ?? null;
    }
    return {
      id: `${bucket}/${o.name}`,
      bucket,
      path: o.name,
      name: o.name,
      url,
      mimetype: meta.mimetype ?? null,
      size: meta.size ?? null,
      createdAt: o.created_at ?? null,
      type,
    };
  });
}

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type"); // "image" | "file" | null
  const supabase = createServiceClient();

  const buckets: MediaItem[][] = [];
  if (type !== "file") buckets.push(await listBucket(supabase, IMAGE_BUCKET, "image"));
  if (type !== "image") buckets.push(await listBucket(supabase, FILE_BUCKET, "file"));

  const items = buckets
    .flat()
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));

  return NextResponse.json({ items });
}

// Rename a single media file (Storage has no rename — we move within the bucket).
export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const bucket = String(body.bucket ?? "");
  const path = String(body.path ?? "");
  const rawName = String(body.name ?? "");

  if (!bucket || !path) {
    return NextResponse.json({ error: "Missing file reference" }, { status: 400 });
  }

  // Keep the original extension; sanitize only the base the admin typed.
  const dot = path.lastIndexOf(".");
  const ext = dot >= 0 ? path.slice(dot).toLowerCase() : "";
  const slash = path.lastIndexOf("/");
  const dir = slash >= 0 ? path.slice(0, slash + 1) : "";

  // Strip any extension the admin may have typed, then re-add the real one.
  const typedDot = rawName.lastIndexOf(".");
  const base = sanitizeBase(typedDot >= 0 ? rawName.slice(0, typedDot) : rawName);
  if (!base) {
    return NextResponse.json({ error: "Please enter a valid name" }, { status: 400 });
  }

  const newPath = `${dir}${base}${ext}`;
  if (newPath === path) {
    return NextResponse.json({ error: "That is already the file name" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Fail clearly if the target name already exists.
  const { data: existing } = await supabase.storage
    .from(bucket)
    .list(dir, { search: `${base}${ext}` });
  if (existing?.some((o) => o.name === `${base}${ext}`)) {
    return NextResponse.json({ error: "A file with that name already exists" }, { status: 409 });
  }

  const { error } = await supabase.storage.from(bucket).move(path, newPath);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const type: "image" | "file" = bucket === IMAGE_BUCKET ? "image" : "file";
  let url: string | null = null;
  if (type === "image") {
    url = supabase.storage.from(bucket).getPublicUrl(newPath).data.publicUrl;
  } else {
    const { data: s } = await supabase.storage.from(bucket).createSignedUrl(newPath, 60 * 60);
    url = s?.signedUrl ?? null;
  }

  return NextResponse.json({
    item: { id: `${bucket}/${newPath}`, bucket, path: newPath, name: newPath, url, type },
  });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const items: { bucket: string; path: string }[] = Array.isArray(body.items) ? body.items : [];
  if (!items.length) {
    return NextResponse.json({ error: "No items to delete" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Group paths per bucket, then remove in batches
  const byBucket = new Map<string, string[]>();
  for (const it of items) {
    if (!it?.bucket || !it?.path) continue;
    const arr = byBucket.get(it.bucket) ?? [];
    arr.push(it.path);
    byBucket.set(it.bucket, arr);
  }

  const errors: string[] = [];
  for (const [bucket, paths] of byBucket) {
    const { error } = await supabase.storage.from(bucket).remove(paths);
    if (error) errors.push(`${bucket}: ${error.message}`);
  }

  if (errors.length) {
    return NextResponse.json({ error: errors.join("; ") }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
