import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/database";

export async function getProducts(category?: string): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (category && category !== "All") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getProducts error:", error);
    return [];
  }
  return data ?? [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("getFeaturedProducts error:", error);
    return [];
  }
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return null;
  return data;
}

export function getProductName(product: Product, locale: string): string {
  return (locale === "de" && product.name_de) ? product.name_de : product.name_en;
}

export function getProductDescription(product: Product, locale: string): string | null {
  return (locale === "de" && product.description_de) ? product.description_de : product.description_en ?? null;
}
