import { createServiceClient } from "@/lib/supabase/server";
import { generateDownloadToken, tokenExpiry } from "@/lib/downloads";
import type { Product } from "@/types/database";

export async function fulfillOrder({
  stripeSessionId,
  customerEmail,
  userId,
  products,
}: {
  stripeSessionId: string;
  customerEmail: string;
  userId?: string | null;
  products: Product[];
}) {
  const supabase = createServiceClient();

  // 1. Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      stripe_session_id: stripeSessionId,
      customer_email: customerEmail,
      user_id: userId ?? null,
      status: "paid" as const,
    })
    .select()
    .single();

  if (orderError || !order) {
    throw new Error(`Failed to create order: ${orderError?.message}`);
  }

  const typedOrder = order as { id: string; stripe_session_id: string; customer_email: string; status: string; created_at: string };

  // 2. Create order items + download tokens
  const downloadTokens: { name: string; token: string; expires: Date }[] = [];

  for (const product of products) {
    const { data: item, error: itemError } = await supabase
      .from("order_items")
      .insert({
        order_id: typedOrder.id,
        product_id: product.id,
        price_paid: product.price,
      })
      .select()
      .single();

    if (itemError || !item) continue;

    const typedItem = item as { id: string; order_id: string; product_id: string; price_paid: number };
    const token = generateDownloadToken(typedItem.id);
    const expires = tokenExpiry();

    await supabase.from("download_tokens").insert({
      token,
      order_item_id: typedItem.id,
      product_id: product.id,
      email: customerEmail,
      expires_at: expires.toISOString(),
      used: false,
    });

    downloadTokens.push({
      name: product.name_en,
      token,
      expires,
    });
  }

  return { order: typedOrder, downloadTokens };
}

export async function getOrderBySession(stripeSessionId: string) {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("orders")
    .select(`*, order_items(*, products(*), download_tokens(*))`)
    .eq("stripe_session_id", stripeSessionId)
    .single();
  return data;
}
