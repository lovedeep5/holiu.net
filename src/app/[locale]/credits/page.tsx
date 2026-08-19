import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import styles from "./credits.module.css";
import { buildAlternates } from "@/lib/seo";
import HreflangLinks from "@/components/seo/HreflangLinks";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Credits & Cooperation",
    description: "Photo credits and cooperation partners for the HOLIU website.",
    alternates: buildAlternates(locale, "/credits"),
    robots: { index: false, follow: true },
  };
}

const photos = [
  { src: "/images/credits/ruth_heinen.jpg", name: "Eva Maria Horstick" },
  { src: "/images/credits/meditation-easy-2x5.jpg", name: "Designecologist" },
  { src: "/images/credits/ruth-1.jpg", name: "Elle Pouchet" },
  { src: "/images/credits/credits-1.jpg", name: "Frank McKenna" },
  { src: "/images/credits/tim-goedhart.jpeg", name: "Tim Goedhart" },
  { src: "/images/credits/credits-4.jpg", name: "Saffu" },
  { src: "/images/credits/credits-3.jpg", name: "Motoki Tonn" },
  { src: "/images/credits/chris-ensey.jpeg", name: "Chris Ensey" },
];

export default async function CreditsPage() {
  const t = await getTranslations("creditsPage");
  return (
    <section
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        paddingTop: "8rem",
        paddingBottom: "5rem",
      }}
    >
      <HreflangLinks path="/credits" />
      <div className="container-max">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#fc8855",
              marginBottom: "0.75rem",
            }}
          >
            {t("eyebrow")}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              color: "#2c2520",
              fontWeight: 400,
            }}
          >
            {t("heading")}
          </h1>
        </div>

        {/* Masonry grid */}
        <div className={styles.grid}>
          {photos.map((photo) => (
            <div key={photo.name} className={styles.item}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={`Photo by ${photo.name}`} />
              <div className={styles.overlay}>
                <p className={styles.label}>{t("imageBy")}</p>
                <p className={styles.name}>{photo.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
