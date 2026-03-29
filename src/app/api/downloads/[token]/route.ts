import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { verifyTokenFormat } from "@/lib/downloads";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!verifyTokenFormat(token)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("download_tokens")
    .select("*, products(file_path, name_en)")
    .eq("token", token)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Token not found" }, { status: 404 });
  }

  const row = data as any;

  if (new Date(row.expires_at) < new Date()) {
    return NextResponse.json({ error: "Token expired" }, { status: 410 });
  }

  const filePath: string | null = row.products?.file_path ?? null;
  if (!filePath) {
    return NextResponse.json({ error: "No file attached to this product" }, { status: 404 });
  }

  const { data: signed, error: signError } = await supabase.storage
    .from("digital-products")
    .createSignedUrl(filePath, 60);

  if (signError || !signed?.signedUrl) {
    return NextResponse.json({ error: "Could not generate download URL" }, { status: 500 });
  }

  await supabase
    .from("download_tokens")
    .update({ used: true } as any)
    .eq("token", token);

  return NextResponse.redirect(signed.signedUrl);
}
