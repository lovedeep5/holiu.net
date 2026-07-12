import { createClient } from "@/lib/supabase/client";

export type UploadedMedia = { bucket: string; path: string; publicUrl: string | null };

// Uploads directly to Supabase Storage via a signed URL instead of routing
// file bytes through our own API — avoids Vercel's ~4.5MB body size cap.
export async function uploadMediaFile(file: File): Promise<UploadedMedia> {
  const signRes = await fetch("/api/admin/media/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: file.name, contentType: file.type }),
  });
  const signData = await signRes.json().catch(() => ({}));
  if (!signRes.ok) throw new Error(signData.error || `Failed to prepare upload for ${file.name}`);

  const { bucket, path, token } = signData as { bucket: string; path: string; token: string };
  const supabase = createClient();
  const { error } = await supabase.storage.from(bucket).uploadToSignedUrl(path, token, file, {
    contentType: file.type || "application/octet-stream",
  });
  if (error) throw new Error(`${file.name}: ${error.message}`);

  const isImage = (file.type || "").startsWith("image/");
  const publicUrl = isImage ? supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl : null;

  return { bucket, path, publicUrl };
}
