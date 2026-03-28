"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";
import { STATIC_PRODUCTS, CATEGORIES } from "@/lib/static-products";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export default function ProductGrid() {
  const t = useTranslations("shop");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? STATIC_PRODUCTS
      : STATIC_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Category filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "3rem",
          justifyContent: "center",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.5rem 1.25rem",
              borderRadius: "9999px",
              border: "1.5px solid",
              cursor: "pointer",
              transition: "all 0.2s",
              borderColor: activeCategory === cat ? "#fc8855" : "rgba(163,141,81,0.3)",
              backgroundColor: activeCategory === cat ? "#fc8855" : "transparent",
              color: activeCategory === cat ? "white" : "#7a6f66",
            }}
          >
            {cat === "All" ? t("allCategories") : cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-montserrat), sans-serif",
            color: "#7a6f66",
          }}
        >
          {t("noProducts")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, i) => {
            const name =
              locale === "de" && product.name_de ? product.name_de : product.name_en;
            return (
              <AnimateIn key={product.slug} delay={(i % 3) * 0.08}>
                <Link href={`/shop/${product.slug}` as any} className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300">
                    {/* Product image */}
                    <div className="relative aspect-[450/685] bg-gradient-to-b from-brand-cream to-white">
                      {product.thumbnail_url ? (
                        <Image
                          src={product.thumbnail_url}
                          alt={name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 90vw, 360px"
                        />
                      ) : (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "3rem",
                            opacity: 0.3,
                          }}
                        >
                          🌟
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5 border-t border-brand-gold/10">
                      <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-brand-gold">
                        {product.category}
                      </span>
                      <div className="flex items-center justify-between mt-1 gap-2">
                        <h3 className="font-display text-base text-brand-dark leading-tight">
                          {name}
                        </h3>
                        <span className="font-body text-sm font-bold text-brand-orange shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>
      )}
    </div>
  );
}
