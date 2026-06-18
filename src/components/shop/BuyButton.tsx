"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface BuyButtonProps {
  productSlug: string;
  price: string;
}

export default function BuyButton({ productSlug, price }: BuyButtonProps) {
  const t = useTranslations("productDetail");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const product = (data.products ?? []).find((p: any) => p.slug === productSlug);
        if (product?.coming_soon) setComingSoon(true);
      })
      .catch(() => {});
  }, [productSlug]);

  async function handleBuy() {
    if (comingSoon) return;
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        const next = encodeURIComponent(window.location.pathname);
        window.location.href = `/${locale}/account/login?next=${next}`;
        return;
      }

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, locale }),
      });
      if (!res.ok) throw new Error("Checkout failed");
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (comingSoon) {
    return (
      <button
        disabled
        className="btn-primary"
        style={{
          width: "100%",
          justifyContent: "center",
          gap: "0.75rem",
          padding: "1rem 2rem",
          fontSize: "0.875rem",
          opacity: 0.6,
          cursor: "not-allowed",
          background: "#d4c9b8",
        }}
      >
        {t("comingSoon")}
      </button>
    );
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="btn-primary"
      style={{
        width: "100%",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "1rem 2rem",
        fontSize: "0.875rem",
        opacity: loading ? 0.7 : 1,
      }}
    >
      <ShoppingBag size={18} />
      {loading ? "Redirecting…" : t("buyNow", { price })}
    </button>
  );
}
