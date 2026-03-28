import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import WaveDivider from "@/components/ui/WaveDivider";
import AnimateIn from "@/components/ui/AnimateIn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("meditation") };
}

export default function MeditationPage() {
  const t = useTranslations("meditationPage");
  const benefits = t("benefits").split("|");

  return (
    <>
      {/* Hero — full bleed lotus flower, no wave divider — transition via padding */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/meditation-bg.jpg"
            alt="Meditation"
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(44,37,32,0.5)" }}
          />
        </div>

        {/* Content centered */}
        <div className="relative z-10 text-center container-max section-padding">
          <AnimateIn direction="none">
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "1.5rem",
              }}
            >
              HOLIU
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
                color: "white",
                lineHeight: 1.2,
                maxWidth: "700px",
                margin: "0 auto 1.5rem",
              }}
            >
              {t("heroHeading")}
            </h1>
            <Link href="#philosophy" className="btn-primary">
              {t("downloadFree")}
            </Link>
          </AnimateIn>
        </div>

        {/* Smooth bottom fade into cream */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "200px",
            background: "linear-gradient(to bottom, transparent, #fdf8f2)",
          }}
        />
      </section>

      {/* Philosophy section */}
      <section id="philosophy" className="section-padding bg-brand-cream">
        <div className="container-max">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center"
          >
            {/* Portrait */}
            <AnimateIn>
              <div
                style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  boxShadow: "0 30px 80px rgba(44,37,32,0.15)",
                }}
              >
                <Image
                  src="/images/backgrounds/channeling.jpg"
                  alt="Meditation practice"
                  width={500}
                  height={620}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </AnimateIn>

            {/* Philosophy text */}
            <AnimateIn delay={0.12}>
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
                Philosophy
              </p>

              {t("philosophyBody")
                .split("\n\n")
                .map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "1rem",
                      lineHeight: 1.85,
                      color: "#7a6f66",
                      marginBottom: "1rem",
                    }}
                  >
                    {para}
                  </p>
                ))}

              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#a38d51",
                  marginTop: "1.5rem",
                }}
              >
                — {t("philosophyCredit")}
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Louise Hay quote */}
      <section
        className="section-padding text-center"
        style={{ backgroundColor: "#f5ede0" }}
      >
        <div className="container-max" style={{ maxWidth: "680px" }}>
          <AnimateIn>
            <p
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                color: "#2c2520",
                lineHeight: 1.5,
                fontStyle: "italic",
                marginBottom: "1.25rem",
              }}
            >
              &ldquo;{t("quoteHay")}&rdquo;
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#a38d51",
              }}
            >
              — {t("quoteHayAuthor")}
            </p>
          </AnimateIn>
        </div>
      </section>

      <WaveDivider fill="#ffffff" background="#f5ede0" variant="curve" />

      {/* Science — benefits section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <AnimateIn className="text-center mb-12">
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
              Science
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                color: "#2c2520",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              {t("scienceHeading")}
            </h2>
          </AnimateIn>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            style={{
              maxWidth: "900px",
              margin: "0 auto 3rem",
            }}
          >
            {benefits.map((benefit, i) => (
              <AnimateIn key={i} delay={i * 0.04}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    padding: "1rem 1.25rem",
                    background: "rgba(163,141,81,0.05)",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(163,141,81,0.12)",
                  }}
                >
                  <span style={{ color: "#fc8855", fontWeight: 700, fontSize: "1rem", lineHeight: 1.6 }}>✓</span>
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.875rem",
                      color: "#7a6f66",
                      lineHeight: 1.5,
                    }}
                  >
                    {benefit}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn className="text-center">
            <Link href="/shop" className="btn-primary">
              {t("visitMeditations")}
            </Link>
          </AnimateIn>
        </div>
      </section>

      <WaveDivider fill="#fdf8f2" background="#ffffff" variant="wave" />

      {/* Three quotes section */}
      <section className="section-padding bg-brand-cream">
        <div className="container-max" style={{ maxWidth: "760px" }}>
          {/* Buddha quote */}
          <AnimateIn className="mb-14">
            <div
              style={{
                padding: "2.5rem",
                background: "white",
                borderRadius: "1.25rem",
                boxShadow: "0 8px 40px rgba(44,37,32,0.06)",
                borderLeft: "4px solid #fc8855",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  color: "#2c2520",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "1rem",
                }}
              >
                &ldquo;{t("quoteBuddha")}&rdquo;
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#a38d51",
                  letterSpacing: "0.1em",
                }}
              >
                — {t("quoteBuddhaAuthor")}
              </p>
            </div>
          </AnimateIn>

          {/* Ruth's personal quote */}
          <AnimateIn className="mb-14">
            <div
              style={{
                padding: "2.5rem",
                background: "#fc8855",
                borderRadius: "1.25rem",
                boxShadow: "0 8px 40px rgba(252,136,85,0.25)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  color: "white",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "1rem",
                }}
              >
                &ldquo;{t("quoteRuth")}&rdquo;
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.8)",
                  letterSpacing: "0.1em",
                }}
              >
                — {t("quoteRuthAuthor")}
              </p>
            </div>
          </AnimateIn>

          {/* Yogananda quote */}
          <AnimateIn>
            <div
              style={{
                padding: "2.5rem",
                background: "white",
                borderRadius: "1.25rem",
                boxShadow: "0 8px 40px rgba(44,37,32,0.06)",
                borderLeft: "4px solid #a38d51",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  color: "#2c2520",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "1rem",
                }}
              >
                &ldquo;{t("quoteYogananda")}&rdquo;
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#a38d51",
                  letterSpacing: "0.1em",
                }}
              >
                — {t("quoteYoganandaAuthor")}
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <WaveDivider fill="#f5ede0" background="#fdf8f2" variant="tilt" />

      {/* Free meditation + discover CTA */}
      <section className="section-padding" style={{ backgroundColor: "#f5ede0" }}>
        <div className="container-max">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
          >
            {/* Audio player */}
            <AnimateIn>
              <div
                style={{
                  background: "white",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#a38d51",
                    marginBottom: "0.5rem",
                  }}
                >
                  Free Gift
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "1.5rem",
                    color: "#2c2520",
                    marginBottom: "0.5rem",
                  }}
                >
                  Chakra Meditation
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.875rem",
                    color: "#7a6f66",
                    marginBottom: "1.5rem",
                  }}
                >
                  Guided · Ruth Heinen
                </p>
                <audio
                  controls
                  style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1.5rem" }}
                  src="https://dev.holiu.net/wp-content/uploads/2025/05/Chakra-Meditation-1.mp3"
                >
                  Your browser does not support the audio element.
                </audio>
                <a
                  href="https://dev.holiu.net/wp-content/uploads/2025/05/Chakra-Meditation-1.mp3"
                  download="Holiu-Chakra-Meditation.mp3"
                  className="btn-primary"
                  style={{ display: "inline-flex" }}
                >
                  {t("downloadFree")}
                </a>
              </div>
            </AnimateIn>

            {/* Discover text */}
            <AnimateIn delay={0.12}>
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
                For You
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  color: "#2c2520",
                  lineHeight: 1.2,
                  marginBottom: "0.75rem",
                }}
              >
                {t("discoverHeading")}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "1rem",
                  color: "#7a6f66",
                  marginBottom: "2rem",
                  lineHeight: 1.7,
                }}
              >
                {t("discoverSubheading")}
              </p>
              <Link href="/shop" className="btn-outline">
                {t("browseMore")}
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
