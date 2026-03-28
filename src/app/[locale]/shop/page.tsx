import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import WaveDivider from "@/components/ui/WaveDivider";
import ProductGrid from "@/components/shop/ProductGrid";
import AnimateIn from "@/components/ui/AnimateIn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("shop") };
}

export default function ShopPage() {
  const t = useTranslations("shop");

  return (
    <>
      {/* Page header */}
      <section
        className="section-padding pt-40"
        style={{ backgroundColor: "#fdf8f2" }}
      >
        <div className="container-max text-center">
          <AnimateIn>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#a38d51",
                marginBottom: "1rem",
              }}
            >
              HOLIU
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                color: "#2c2520",
                marginBottom: "1rem",
              }}
            >
              {t("heading")}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "1rem",
                color: "#7a6f66",
                maxWidth: "560px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {t("subheading")}
            </p>
          </AnimateIn>
        </div>
      </section>

      <WaveDivider fill="#ffffff" background="#fdf8f2" variant="curve" />

      {/* Products */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <ProductGrid />
        </div>
      </section>
    </>
  );
}
