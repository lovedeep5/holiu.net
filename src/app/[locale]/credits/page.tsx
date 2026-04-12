import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import styles from "./credits.module.css";

export const metadata: Metadata = { title: "Credits & Cooperation" };

const photos = [
  { src: "/images/ruth-meditation-portrait.jpg", name: "Eva Maria Horstick" },
  { src: "/images/backgrounds/bg-3.jpg", name: "Designecologist" },
  { src: "/images/med-02.jpg", name: "Elle Pouchet" },
  { src: "/images/backgrounds/beach-2.jpg", name: "Frank McKenna" },
  { src: "/images/med-06.jpg", name: "Tim Goedhart" },
  { src: "/images/backgrounds/channeling.jpg", name: "Saffu" },
  { src: "/images/med-07.jpg", name: "Motoki Tonn" },
  { src: "/images/backgrounds/full2.jpg", name: "Chris Ensey" },
  { src: "/images/med-04.jpg", name: "Drew Graham" },
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
