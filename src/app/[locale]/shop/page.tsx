import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ProductGrid from "@/components/shop/ProductGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("shop") };
}

export default async function ShopPage() {
  return (
    <>
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
              Home
            </Link>
            {" / Shop"}
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
            Shop
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
