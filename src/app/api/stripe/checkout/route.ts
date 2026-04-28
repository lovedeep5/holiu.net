import { NextRequest, NextResponse } from "next/server";
import { getStripeClient, getStripeMode } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import type { Product } from "@/types/database";

export async function POST(req: NextRequest) {
  try {
    const { productSlug, locale = "en" } = await req.json();

    if (!productSlug) {
      return NextResponse.json({ error: "productSlug required" }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", productSlug)
      .eq("published", true)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = data as unknown as Product;
    const name = locale === "de" && product.name_de ? product.name_de : product.name_en;

    // Derive base URL from request host so it works on any domain without env var issues
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "holiu-net.vercel.app";
    const proto = host.startsWith("localhost") ? "http" : "https";
    const baseUrl = `${proto}://${host}`;

    const [stripeClient, mode] = await Promise.all([getStripeClient(), getStripeMode()]);

    // In test mode skip pre-saved price IDs (they belong to live mode)
    const lineItem =
      product.stripe_price_id && mode === "live"
        ? { price: product.stripe_price_id, quantity: 1 as const }
        : {
            price_data: {
              currency: product.currency || "eur",
              unit_amount: product.price,
              product_data: {
                name: mode === "test" ? `[TEST] ${name}` : name,
                images: product.thumbnail_url
                  ? [`${baseUrl}${product.thumbnail_url}`]
                  : [],
              },
            },
            quantity: 1 as const,
          };

    const session = await stripeClient.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [lineItem],
      success_url: `${baseUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/${locale}/checkout/cancel`,
      metadata: {
        product_id: product.id,
        product_slug: product.slug,
        locale,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[stripe/checkout]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
