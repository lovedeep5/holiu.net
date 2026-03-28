import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import AnimateIn from "@/components/ui/AnimateIn";
import { STATIC_PRODUCTS } from "@/lib/static-products";
import BuyButton from "@/components/shop/BuyButton";
import { Link } from "@/i18n/navigation";
import { ShieldCheck, Download, ArrowLeft } from "lucide-react";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export function generateStaticParams() {
  return STATIC_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = STATIC_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  const name =
    locale === "de" && product.name_de ? product.name_de : product.name_en;
  return { title: name };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const product = STATIC_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: "productDetail" });

  const name =
    locale === "de" && product.name_de ? product.name_de : product.name_en;
  const description =
    locale === "de" && product.description_de
      ? product.description_de
      : product.description_en;

  return (
    <section className="section-padding bg-brand-cream min-h-screen pt-36">
      <div className="container-max">
        {/* Back */}
        <AnimateIn>
          <Link
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#a38d51",
              marginBottom: "2.5rem",
            }}
          >
            <ArrowLeft size={14} />
            {t("backToShop")}
          </Link>
        </AnimateIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Product image */}
          <AnimateIn>
            <div
              style={{
                background: "white",
                borderRadius: "1.5rem",
                padding: "1.5rem",
                boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "450/685" }}>
                {product.thumbnail_url && (
                  <Image
                    src={product.thumbnail_url}
                    alt={name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 90vw, 45vw"
                    priority
                  />
                )}
              </div>
            </div>
          </AnimateIn>

          {/* Product info */}
          <AnimateIn delay={0.12}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#a38d51",
                marginBottom: "0.75rem",
              }}
            >
              {product.category}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                color: "#2c2520",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              {name}
            </h1>

            {/* Price */}
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#fc8855",
                marginBottom: "1.5rem",
              }}
            >
              {formatPrice(product.price)}
            </p>

            {/* Description */}
            {description && (
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "#7a6f66",
                  marginBottom: "2rem",
                }}
              >
                {description}
              </p>
            )}

            {/* Trust badges */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginBottom: "2rem",
                padding: "1.25rem",
                background: "rgba(163,141,81,0.06)",
                borderRadius: "0.75rem",
                border: "1px solid rgba(163,141,81,0.15)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Download size={16} color="#a38d51" />
                <span
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.8rem",
                    color: "#7a6f66",
                  }}
                >
                  {t("digitalDownload")}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <ShieldCheck size={16} color="#a38d51" />
                <span
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.8rem",
                    color: "#7a6f66",
                  }}
                >
                  {t("securePayment")}
                </span>
              </div>
            </div>

            {/* Buy button */}
            <BuyButton productSlug={slug} price={formatPrice(product.price)} />

            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.75rem",
                color: "rgba(122,111,102,0.6)",
                marginTop: "1rem",
              }}
            >
              {t("downloadInfo")}
            </p>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
