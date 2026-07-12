import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { IMAGE_BUCKET, FILE_BUCKET, sanitizeName } from "@/lib/media";

export const runtime = "nodejs";

// Issues a signed upload URL so the browser can upload directly to Supabase
// Storage, bypassing Vercel's ~4.5MB serverless function body limit.
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const name = String(body.name ?? "");
  const contentType = String(body.contentType ?? "");

  if (!name) {
    return NextResponse.json({ error: "Missing file name" }, { status: 400 });
  }

  const bucket = contentType.startsWith("image/") ? IMAGE_BUCKET : FILE_BUCKET;
  const path = sanitizeName(name);

  const supabase = createServiceClient();
  const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(path);

  if (error || !data) {
    return NextResponse.json({ error: error?.message || "Failed to prepare upload" }, { status: 500 });
  }

  return NextResponse.json({ bucket, path: data.path, token: data.token });
}
