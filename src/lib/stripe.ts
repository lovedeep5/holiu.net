import Stripe from "stripe";
import { createServiceClient } from "@/lib/supabase/server";

const API_VERSION = "2026-03-25.dahlia" as const;

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_replace_me",
  { apiVersion: API_VERSION }
);

export async function getStripeMode(): Promise<"live" | "test"> {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "stripe_test_mode")
      .single();
    return data?.value === "true" ? "test" : "live";
  } catch {
    return "live";
  }
}

export async function getStripeClient(): Promise<Stripe> {
  const mode = await getStripeMode();
  const key =
    mode === "test"
      ? process.env.STRIPE_SECRET_KEY_TEST || "sk_test_dummy"
      : process.env.STRIPE_SECRET_KEY || "sk_live_dummy";
  return new Stripe(key, { apiVersion: API_VERSION });
}
