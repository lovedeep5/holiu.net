"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function TreasureSection() {
  const t = useTranslations("home.treasure");

  return (
    <section className="section-padding bg-white text-center">
      <div className="container-max flex flex-col items-center" style={{ gap: "1rem" }}>
        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(0.65rem, 1.2vw, 0.8rem)",
            fontWeight: 600,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#2c2520",
            margin: 0,
          }}
        >
          {t("eyebrow")}
        </p>

        <h2
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(3.5rem, 9vw, 7rem)",
            lineHeight: 1,
            color: "#2c2520",
            margin: 0,
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          {t("title")}
        </h2>

        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(0.65rem, 1.2vw, 0.8rem)",
            fontWeight: 600,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#2c2520",
            margin: 0,
          }}
        >
          {t("subtitle")}
        </p>

        <Link
          href="/get-started"
          className="btn-primary"
          style={{ marginTop: "0.5rem", letterSpacing: "0.1em" }}
        >
          {t("cta")}
        </Link>

        <div style={{ marginTop: "0.75rem", width: "100%", maxWidth: "480px" }}>
          <audio
            controls
            preload="none"
            style={{ width: "100%", accentColor: "#a38d51" }}
          >
            <source src="https://dev.holiu.net/wp-content/uploads/2025/05/Chakra-Meditation-1.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </section>
  );
}
