import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ProductGrid from "@/components/shop/ProductGrid";
import { buildAlternates, OG_IMAGE } from "@/lib/seo";
import HreflangLinks from "@/components/seo/HreflangLinks";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const description =
    locale === "de"
      ? "Entdecke Meditationen, Chakra-Balancing-Sitzungen und spirituelle Coaching-Programme von Ruth Heinen – digitale Downloads für deinen Weg zu mehr Wohlbefinden."
      : "Shop meditations, chakra balancing sessions, and spiritual coaching programs by Ruth Heinen — digital downloads to support your wellness journey.";
  return {
    title: t("shop"),
    description,
    alternates: buildAlternates(locale, "/shop"),
    openGraph: { title: t("shop"), description, images: [OG_IMAGE] },
  };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: "nav" });
  return (
    <>
      <HreflangLinks path="/shop" />
      {/* Simple page header — matches original */}
      <div style={{ backgroundColor: "#ffffff", paddingTop: "6rem", paddingBottom: "0" }}>
        <div className="container-max">
          {/* Breadcrumb */}
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.75rem",
              color: "#a38d51",
              marginBottom: "0.5rem",
            }}
          >
            <Link href="/" style={{ color: "#a38d51", textDecoration: "none" }}>
              {tn("home")}
            </Link>
            {` / ${tn("shop")}`}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              color: "#2c2520",
              fontWeight: 400,
              marginBottom: "2rem",
            }}
          >
            {tn("shop")}
          </h1>
        </div>
      </div>

      {/* Products + sidebar */}
      <section style={{ backgroundColor: "#ffffff", padding: "1.5rem 0 5rem" }}>
        <div className="container-max">
          <ProductGrid />
        </div>
      </section>
    </>
  );
}
