import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import WaveDivider from "@/components/ui/WaveDivider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("about") };
}

export default async function AboutPage() {
  const t = await getTranslations("aboutPage");

  const paragraphs = t("section1Body").split("\n\n");

  return (
    <>
      {/* Hero — full viewport editorial photo, face visible at top */}
      <section className="relative h-[70vh] md:h-screen" style={{ minHeight: "420px" }}>
        <Image
          src="/images/backgrounds/ruth-outdoor.jpg"
          alt={t("heroAlt")}
          fill
          className="object-cover"
          style={{ objectPosition: "center top" }}
          priority
        />
      </section>

      {/* Section 1 — Centered text, signature, CTA */}
      <section style={{ backgroundColor: "#fdf0ea", padding: "3rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              color: "#2c2520",
              marginBottom: "2.5rem",
              fontWeight: 400,
            }}
          >
            {t("section1Heading")}
          </h1>

          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "#5a4a3a",
                marginBottom: "1.1rem",
              }}
            >
              {para}
            </p>
          ))}

          {/* Signature */}
          <div style={{ margin: "2.5rem 0 2rem" }}>
            <Image
              src="/images/ruth-signature-real.png"
              alt="Ruth's signature"
              width={160}
              height={60}
              style={{ height: "auto", display: "inline-block" }}
            />
          </div>

          {/* CTA */}
          <Link href="/meditation" className="btn-primary">
            {t("freeMeditationBtn")}
          </Link>
        </div>
      </section>

      {/* Wave: peach section 1 → white section 2 */}
      <WaveDivider fill="#ffffff" background="#fdf0ea" variant="wave" />

      {/* Section 2 — Circle photo + credentials + horizontal gold divider */}
      <section style={{ backgroundColor: "#ffffff", padding: "4rem 1.5rem 0", textAlign: "center" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          {/* Circle photo */}
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto 1.75rem",
              position: "relative",
            }}
          >
            <Image
              src="/images/ruth-heinen-about.jpg"
              alt="Ruth Heinen"
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.6rem, 3vw, 2rem)",
              color: "#2c2520",
              marginBottom: "0.5rem",
              fontWeight: 700,
            }}
          >
            Ruth Heinen
          </h2>

          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.8rem",
              color: "#5a4a3a",
              lineHeight: 1.9,
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            Founder &amp; CEO Holiu.net<br />
            Channel Medium, Fashion Designer,<br />
            Healer &amp; Spiritual Lifestyle Coach
          </p>
        </div>

        {/* Gold horizontal divider (NOT wave) */}
        <div
          style={{
            width: "100%",
            maxWidth: "960px",
            margin: "3.5rem auto 0",
            height: "1px",
            background: "linear-gradient(to right, transparent, #c9a84c 15%, #c9a84c 85%, transparent)",
          }}
        />
      </section>

      {/* Section 3 — Visit Courses & Workshops (same white bg) */}
      <section style={{ backgroundColor: "#ffffff", padding: "4rem 1.5rem 5rem" }}>
        <div className="container-max">
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#7a6f66",
                marginBottom: "0.4rem",
              }}
            >
              {t("visitSection")}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                color: "#2c2520",
                marginBottom: "0.75rem",
                fontWeight: 400,
              }}
            >
              {t("visitSubheading")}
            </h2>
            {/* Orange accent line */}
            <div style={{ width: "48px", height: "3px", background: "#fc8855", margin: "0 auto" }} />
          </div>

          {/* 2 images side by side — stacks on mobile, 2-col on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course card */}
            <Link
              href="/courses"
              className="group"
              style={{
                display: "block",
                position: "relative",
                borderRadius: "0.5rem",
                overflow: "hidden",
                aspectRatio: "2/3",
              }}
            >
              <Image
                src="/images/backgrounds/courses-hero.jpg"
                alt={t("visitCourse")}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
              {/* 20% orange overlay on hover */}
              <div
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: "rgba(252,136,85,0.45)" }}
              />
              {/* Label */}
              <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: "white",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {t("visitCourse")}
                </span>
              </div>
            </Link>

            {/* Workshop card */}
            <Link
              href="/shop"
              className="group"
              style={{
                display: "block",
                position: "relative",
                borderRadius: "0.5rem",
                overflow: "hidden",
                aspectRatio: "2/3",
              }}
            >
              <Image
                src="/images/backgrounds/full2.jpg"
                alt={t("visitWorkshop")}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
              {/* 20% orange overlay on hover */}
              <div
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: "rgba(252,136,85,0.45)" }}
              />
              {/* Label */}
              <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: "white",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {t("visitWorkshop")}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
