"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Full-bleed beach background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg-2.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Subtle warm overlay so dark text stays readable */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(253,248,242,0.42)" }}
        />
      </div>

      {/* Centered content */}
      <div
        className="relative z-10 flex flex-col items-center px-6"
        style={{ gap: "1.25rem", paddingTop: "6rem", paddingBottom: "4rem" }}
      >
        {/* HOLIU Logo mark */}
        <div style={{ marginBottom: "0.5rem" }}>
          <Image
            src="/images/logo-dark.png"
            alt="HOLIU"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* DISCOVER THE */}
        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
            fontWeight: 700,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#2c2520",
            margin: 0,
          }}
        >
          {t("eyebrow")}
        </p>

        {/* TREASURE */}
        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(4.5rem, 13vw, 11rem)",
            lineHeight: 0.95,
            color: "#2c2520",
            margin: 0,
            fontWeight: 700,
          }}
        >
          {t("title")}
        </h1>

        {/* INSIDE OF YOU */}
        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(0.8rem, 1.8vw, 1.1rem)",
            fontWeight: 600,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#2c2520",
            margin: 0,
          }}
        >
          {t("subtitle")}
        </p>

        {/* START TODAY */}
        <Link
          href="/shop"
          className="btn-primary"
          style={{ marginTop: "0.75rem", letterSpacing: "0.1em" }}
        >
          {t("cta")}
        </Link>

        {/* Audio player — free Chakra Meditation */}
        <div style={{ marginTop: "1rem" }}>
          <audio
            controls
            style={{
              height: "36px",
              accentColor: "#fc8855",
              opacity: 0.85,
            }}
            src="https://dev.holiu.net/wp-content/uploads/2025/05/Chakra-Meditation-1.mp3"
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </section>
  );
}
