import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import WaveDivider from "@/components/ui/WaveDivider";
import InspirationCarousel from "@/components/meditation/InspirationCarousel";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("meditation") };
}

export default async function MeditationPage() {
  const t = await getTranslations("meditationPage");
  const benefits = t("benefits").split("|");

  return (
    <>
      {/* Hero — "breathe" neon */}
      <section className="relative">
        {/* Mobile: full image, no cropping */}
        <div className="md:hidden">
          <Image
            src="/images/backgrounds/bg-5.jpg"
            alt="Breathe"
            width={1080}
            height={1350}
            sizes="100vw"
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
        {/* Desktop: full-screen fill */}
        <div className="hidden md:block relative h-screen" style={{ minHeight: "560px" }}>
          <Image
            src="/images/backgrounds/bg-5.jpg"
            alt="Breathe"
            fill
            className="object-cover"
            style={{ objectPosition: "center center" }}
            priority
          />
        </div>
      </section>

      {/* Section 2 — Philosophy (peach) */}
      <section style={{ backgroundColor: "#fdf0ea", padding: "5rem 1.5rem 0" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", paddingBottom: "4rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: "#2c2520",
              fontWeight: 400,
              marginBottom: "1.25rem",
              lineHeight: 1.3,
            }}
          >
            {t("heroHeading")}
          </h1>
          {/* Orange underline */}
          <div style={{ width: "48px", height: "3px", background: "#fc8855", margin: "0 auto 2.5rem" }} />

          {t("philosophyBody")
            .split("\n\n")
            .map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.85,
                  color: "#5a4a3a",
                  marginBottom: "1rem",
                }}
              >
                {para}
              </p>
            ))}

          {/* Ruth signature */}
          <div style={{ marginTop: "2rem" }}>
            <p
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                color: "#2c2520",
                fontWeight: 700,
                marginBottom: "0.15rem",
              }}
            >
              Ruth Heinen
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.65rem",
                color: "#7a6f66",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              CEO &amp; Founder HOLIU
            </p>
          </div>
        </div>

        {/* Wave: peach → white */}
        <WaveDivider fill="#ffffff" background="#fdf0ea" variant="wave" />
      </section>

      {/* Section 3 — Louise Hay quote (white) */}
      <section style={{ backgroundColor: "#ffffff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          {/* Large quote marks */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "5rem",
              color: "#fc8855",
              lineHeight: 0.7,
              marginBottom: "1rem",
              opacity: 0.55,
              textAlign: "left",
            }}
          >
            &#8220;
          </div>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
              color: "#4a3f38",
              lineHeight: 1.8,
              marginBottom: "1.75rem",
            }}
          >
            {t("quoteHay")}
          </p>
          {/* Avatar + name row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src="/images/louise-hay.jpg"
                alt={t("quoteHayAuthor")}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.85rem",
                color: "#5a4a3a",
                fontWeight: 500,
              }}
            >
              {t("quoteHayAuthor")}
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Science benefits (white, 2-col) */}
      <section style={{ backgroundColor: "#ffffff", padding: "5rem 1.5rem 6rem" }}>
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: heading + bullet list + button */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                  color: "#a38d51",
                  fontStyle: "italic",
                  fontWeight: 400,
                  marginBottom: "1.5rem",
                  lineHeight: 1.3,
                }}
              >
                {t("scienceHeading")}
              </h2>
              <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", marginBottom: "2rem" }}>
                {benefits.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.85rem",
                      color: "#5a4a3a",
                      lineHeight: 1.7,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/shop" className="btn-primary" style={{ fontSize: "0.75rem" }}>
                {t("visitMeditations")} »
              </Link>
            </div>

            {/* Right: lotus image — white border + drop shadow */}
            <div
              style={{
                border: "6px solid #ffffff",
                boxShadow: "0 12px 50px rgba(0,0,0,0.18)",
                display: "inline-block",
                width: "100%",
              }}
            >
              <Image
                src="/images/med-4.jpg"
                alt="Lotus meditation"
                width={600}
                height={900}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Buddha quote (light warm) */}
      <section style={{ backgroundColor: "#f5f0eb", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "5rem",
              color: "#fc8855",
              lineHeight: 0.7,
              marginBottom: "1rem",
              opacity: 0.5,
              textAlign: "left",
            }}
          >
            &#8220;
          </div>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
              color: "#4a3f38",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}
          >
            {t("quoteBuddha")}
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.85rem",
              color: "#5a4a3a",
            }}
          >
            {t("quoteBuddhaAuthor")} ♥
          </p>
        </div>
      </section>

      {/* Section 6 — Ruth photo + quote (white, 2-col) */}
      <section style={{ backgroundColor: "#ffffff", padding: "5rem 1.5rem" }}>
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" style={{ maxWidth: "980px", margin: "0 auto" }}>
            {/* Left: Ruth photo — white border + drop shadow */}
            <div
              style={{
                border: "6px solid #ffffff",
                boxShadow: "0 12px 50px rgba(0,0,0,0.15)",
                display: "inline-block",
                width: "100%",
              }}
            >
              <Image
                src="/images/med-5.jpg"
                alt="Ruth Heinen meditating"
                width={500}
                height={650}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

            {/* Right: quote */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "4rem",
                  color: "#fc8855",
                  lineHeight: 0.8,
                  marginBottom: "0.75rem",
                  opacity: 0.5,
                }}
              >
                &#8220;
              </div>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "clamp(0.85rem, 1.6vw, 0.95rem)",
                  color: "#4a3f38",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                {t("quoteRuth")}
              </p>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "4rem",
                  color: "#fc8855",
                  lineHeight: 0.5,
                  marginBottom: "1rem",
                  opacity: 0.5,
                }}
              >
                &#8221;
              </div>
              <p
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "1.15rem",
                  color: "#a38d51",
                  fontWeight: 700,
                  marginBottom: "0.15rem",
                }}
              >
                Ruth Heinen
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.65rem",
                  color: "#a38d51",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                CEO &amp; founder of HOLIU
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — Yogananda quote (light warm) */}
      <section style={{ backgroundColor: "#f5f0eb", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "5rem",
              color: "#fc8855",
              lineHeight: 0.7,
              marginBottom: "1rem",
              opacity: 0.5,
            }}
          >
            &#8220;
          </div>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
              color: "#4a3f38",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            <strong>{t("quoteYogananda").split(" ").slice(0, 1).join(" ")}</strong>{" "}
            {t("quoteYogananda").split(" ").slice(1).join(" ")}
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.85rem",
              color: "#5a4a3a",
              textAlign: "center",
            }}
          >
            {t("quoteYoganandaAuthor")}
          </p>
        </div>
      </section>

      {/* Section 8 — CTA (peach, 2-col) */}
      <section style={{ backgroundColor: "#fce4dc", padding: "5rem 1.5rem" }}>
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                  color: "#2c2520",
                  fontWeight: 400,
                  marginBottom: "0.35rem",
                  lineHeight: 1.2,
                }}
              >
                {t("discoverHeading")}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#7a6f66",
                }}
              >
                {t("discoverSubheading")}
              </p>
            </div>
            <Link href="/shop" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
              {t("visitMeditations").toUpperCase()}
            </Link>
          </div>
        </div>
      </section>

      {/* Wave: peach → white */}
      <WaveDivider fill="#ffffff" background="#fce4dc" variant="wave" />

      {/* Section 9 — Inspiration & Motivation (white) */}
      <section style={{ backgroundColor: "#ffffff", padding: "5rem 1.5rem 6rem" }}>
        <div className="container-max">
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#7a6f66",
                marginBottom: "0.4rem",
              }}
            >
              {t("inspirationSub")}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                color: "#2c2520",
                fontWeight: 400,
                marginBottom: "0.75rem",
              }}
            >
              {t("inspirationTitle")}
            </h2>
            <div style={{ width: "48px", height: "3px", background: "#fc8855", margin: "0 auto" }} />
          </div>

          {/* Carousel */}
          <InspirationCarousel />
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />
    </>
  );
}
