import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import { fulfillOrder } from "@/lib/orders";
import { sendPurchaseEmail } from "@/lib/resend";
import type { Product } from "@/types/database";

export const runtime = "nodejs";

function constructEvent(body: string, sig: string) {
  const liveSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const testSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST;

  if (liveSecret) {
    try {
      return stripe.webhooks.constructEvent(body, sig, liveSecret);
    } catch {}
  }
  if (testSecret) {
    return stripe.webhooks.constructEvent(body, sig, testSecret);
  }
  throw new Error("No webhook secrets configured");
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  if (sig) {
    try {
      event = constructEvent(body, sig);
    } catch (err: any) {
      console.error("[webhook] Signature verification failed:", err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email || session.customer_email;
    const productId = session.metadata?.product_id;

    if (!customerEmail || !productId) {
      console.error("[webhook] Missing email or product_id");
      return NextResponse.json({ ok: true });
    }

    const supabase = createServiceClient();

    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    if (existing) return NextResponse.json({ ok: true });

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (!data) {
      console.error("[webhook] Product not found:", productId);
      return NextResponse.json({ ok: true });
    }

    const product = data as unknown as Product;

    const { downloadTokens } = await fulfillOrder({
      stripeSessionId: session.id,
      customerEmail,
      products: [product],
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://holiu-net.vercel.app";
    const links = downloadTokens.map((t) => ({
      name: t.name,
      url: `${baseUrl}/api/downloads/${t.token}`,
      expires: t.expires.toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      }),
    }));

    await sendPurchaseEmail({
      to: customerEmail,
      products: [{ name: product.name_en }],
      downloadLinks: links,
    });
  }

  return NextResponse.json({ ok: true });
}
