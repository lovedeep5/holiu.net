import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data } = await supabase
    .from("orders")
    .select(`
      id,
      customer_email,
      status,
      created_at,
      order_items (
        id,
        price_paid,
        products ( id, name_en, name_de, thumbnail_url ),
        download_tokens ( token, expires_at, used )
      )
    `)
    .eq("stripe_session_id", sessionId)
    .eq("status", "paid" as any)
    .maybeSingle();

  if (!data) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const order = data as any;
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "holiu-net.vercel.app";
  const proto = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${proto}://${host}`;

  const items = ((order.order_items as any[]) || []).map((item: any) => {
    const token = item.download_tokens?.[0];
    return {
      product: item.products,
      price_paid: item.price_paid,
      download_url: token ? `${baseUrl}/api/downloads/${token.token}` : null,
      expires_at: token?.expires_at ?? null,
    };
  });

  return NextResponse.json({
    order_id: order.id,
    email: order.customer_email,
    status: order.status,
    created_at: order.created_at,
    items,
  });
}
