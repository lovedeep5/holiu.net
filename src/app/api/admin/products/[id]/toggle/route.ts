import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { isAdminAuthed } from "@/lib/admin-auth";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createServiceClient();

  const { data: product } = await supabase
    .from("products")
    .select("published")
    .eq("id", id)
    .single();

  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { error } = await supabase
    .from("products")
    .update({ published: !product.published } as any)
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.redirect(new URL("/en/admin/products", _req.url));
}
