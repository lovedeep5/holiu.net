import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import type { Product } from "@/types/database";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).single();

  if (!data) notFound();

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", color: "white", marginBottom: "2rem" }}>
        Edit Product
      </h1>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(163,141,81,0.1)", borderRadius: "1rem", padding: "2rem" }}>
        <ProductForm product={data as unknown as Product} />
      </div>
    </div>
  );
}
