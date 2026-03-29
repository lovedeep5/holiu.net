import Stripe from "stripe";

// Stripe client — uses dummy key if not set so the app compiles without crashing
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_replace_me",
  { apiVersion: "2026-03-25.dahlia" }
);
