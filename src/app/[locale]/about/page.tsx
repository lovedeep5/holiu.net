import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
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
  return { title: t("about") };
}

export default function AboutPage() {
  const t = useTranslations("aboutPage");

  return (
    <>
      {/* Hero — Ruth's editorial fashion photo, no wave divider at bottom */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "65vh" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/ruth-outdoor.jpg"
            alt={t("heroAlt")}
            fill
            className="object-cover"
            style={{ objectPosition: "center top" }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(44,37,32,0.9) 0%, rgba(44,37,32,0.4) 45%, rgba(44,37,32,0.05) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 container-max section-padding pb-14">
          <AnimateIn direction="up">
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2.75rem, 5vw, 5rem)",
                color: "white",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Ruth Heinen
            </h1>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
                marginTop: "0.75rem",
              }}
            >
              Spiritual Coach · Channel Medium · Healer & Fashion Designer
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* My Path to Meditation — flows directly from hero, no wave */}
      <section className="section-padding bg-brand-cream">
        <div className="container-max">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 420px",
              gap: "4rem",
              alignItems: "start",
            }}
            className="lg:grid-cols-[1fr_420px] grid-cols-1"
          >
            {/* Text — left */}
            <AnimateIn>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#a38d51",
                  marginBottom: "0.75rem",
                }}
              >
                About Ruth
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  color: "#2c2520",
                  lineHeight: 1.15,
                  marginBottom: "2rem",
                }}
              >
                {t("section1Heading")}
              </h2>

              {t("section1Body")
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

              {/* Signature + credit */}
              <div style={{ marginTop: "2.5rem" }}>
                <Image
                  src="/images/ruth-signature-real.png"
                  alt="Ruth's signature"
                  width={170}
                  height={65}
                  style={{ height: "auto", marginBottom: "0.75rem" }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.8rem",
                    color: "#a38d51",
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                  }}
                >
                  {t("credit")}
                </p>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <Link href="/meditation" className="btn-primary">
                  {t("freeMeditationBtn")}
                </Link>
              </div>
            </AnimateIn>

            {/* Portrait — right, sticky so it stays in view while text scrolls */}
            <AnimateIn delay={0.12}>
              <div
                style={{
                  position: "sticky",
                  top: "100px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    boxShadow: "0 24px 60px rgba(44,37,32,0.18)",
                  }}
                >
                  <Image
                    src="/images/ruth-heinen-about.jpg"
                    alt="Ruth Heinen"
                    width={420}
                    height={520}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                  {/* Gold accent border */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "1px solid rgba(163,141,81,0.25)",
                      borderRadius: "1.25rem",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <WaveDivider fill="#f5ede0" background="#fdf8f2" variant="wave" />

      {/* Visit Courses & Workshops */}
      <section className="section-padding" style={{ backgroundColor: "#f5ede0" }}>
        <div className="container-max">
          <AnimateIn className="text-center mb-10">
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#a38d51",
                marginBottom: "0.5rem",
              }}
            >
              {t("visitSection")}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#2c2520",
              }}
            >
              {t("visitSubheading")}
            </h2>
          </AnimateIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
            className="md:grid-cols-2 grid-cols-1"
          >
            {/* Course card */}
            <AnimateIn delay={0.05}>
              <Link href="/courses" className="group block">
                <div
                  style={{
                    position: "relative",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    aspectRatio: "4/3",
                  }}
                >
                  <Image
                    src="/images/backgrounds/courses-hero.jpg"
                    alt={t("visitCourse")}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 90vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(44,37,32,0.72) 0%, rgba(44,37,32,0.08) 60%, transparent 100%)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                        color: "white",
                        lineHeight: 1.2,
                      }}
                    >
                      {t("visitCourse")}
                    </h3>
                  </div>
                </div>
              </Link>
            </AnimateIn>

            {/* Workshop card */}
            <AnimateIn delay={0.12}>
              <Link href="/shop" className="group block">
                <div
                  style={{
                    position: "relative",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    aspectRatio: "4/3",
                  }}
                >
                  <Image
                    src="/images/backgrounds/full2.jpg"
                    alt={t("visitWorkshop")}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 90vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(44,37,32,0.62) 0%, rgba(44,37,32,0.08) 60%, transparent 100%)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                        color: "white",
                        lineHeight: 1.2,
                      }}
                    >
                      {t("visitWorkshop")}
                    </h3>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      <WaveDivider fill="#fc8855" background="#f5ede0" variant="tilt" />

      {/* CTA */}
      <section className="section-padding text-center" style={{ backgroundColor: "#fc8855" }}>
        <AnimateIn direction="none">
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            {t("ctaHeading")}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              color: "rgba(255,255,255,0.85)",
              fontSize: "1rem",
              marginBottom: "2rem",
            }}
          >
            {t("ctaBody")}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop" className="btn-primary" style={{ backgroundColor: "white", color: "#fc8855" }}>
              {t("ctaShop")}
            </Link>
            <Link href="/meditation" className="btn-outline" style={{ borderColor: "white", color: "white" }}>
              {t("ctaMeditation")}
            </Link>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
