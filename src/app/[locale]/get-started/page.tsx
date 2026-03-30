import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "getStarted" });
  return { title: t("heading") };
}

export default async function GetStartedPage() {
  const t = await getTranslations("getStarted");

  return (
    <section style={{ backgroundColor: "#fdf8f2", minHeight: "100vh", paddingTop: "8rem", paddingBottom: "8rem" }}>
      <div className="container-max">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          style={{ maxWidth: "1020px", margin: "0 auto" }}
        >
          {/* Left — text content */}
          <div>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                color: "#2c2520",
                fontWeight: 400,
                lineHeight: 1.35,
                marginBottom: "2.5rem",
              }}
            >
              {t("heading")}
            </h1>

            {(["p1", "p2", "p3"] as const).map((key) => (
              <p
                key={key}
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.95rem",
                  color: "#5a4a3a",
                  lineHeight: 1.9,
                  marginBottom: "1.5rem",
                }}
              >
                {t(key)}
              </p>
            ))}

            <p
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "1.15rem",
                color: "#a38d51",
                fontStyle: "italic",
                marginBottom: "2.5rem",
              }}
            >
              {t("closing")}
            </p>

            {/* Audio player */}
            <div style={{ marginBottom: "2rem" }}>
              <audio
                controls
                style={{ width: "100%", maxWidth: "420px", accentColor: "#a38d51" }}
                src="https://dev.holiu.net/wp-content/uploads/2025/05/Chakra-Meditation-1.mp3"
              >
                Your browser does not support the audio element.
              </audio>
            </div>

            <Link href="/shop" className="btn-primary">
              {t("downloadBtn")}
            </Link>
          </div>

          {/* Right — product image */}
          <div className="flex justify-center">
            <div
              style={{
                border: "6px solid #ffffff",
                boxShadow: "0 12px 50px rgba(0,0,0,0.15)",
                display: "inline-block",
                maxWidth: "400px",
                width: "100%",
              }}
            >
              <Image
                src="/images/chakra-meditation-orig.png"
                alt={t("imageAlt")}
                width={500}
                height={500}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
