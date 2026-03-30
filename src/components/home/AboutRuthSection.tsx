import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function AboutRuthSection() {
  const t = await getTranslations("home.about");

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #fee5db 0%, #fdc8b1 100%)",
      }}
    >
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Ruth's portrait */}
          <div className="flex justify-center md:justify-end">
            <div
              style={{
                position: "relative",
                width: "min(100%, 420px)",
                aspectRatio: "4 / 5",
                borderRadius: "0.5rem",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/ruth-portrait-orig.jpg"
                alt="Ruth Heinen"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 420px"
                quality={75}
              />
            </div>
          </div>

          {/* Right: text content */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#2c2520",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
                fontWeight: 400,
              }}
            >
              {t("greeting")}
            </h2>

            {(["p1","p2","p3","p4","p5","p6"] as const).map((key) => (
              <p key={key} style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.95rem", lineHeight: 1.85, color: "#5a2a10", marginBottom: "1rem" }}>
                {t(key)}
              </p>
            ))}

            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.95rem", lineHeight: 1.85, color: "#5a2a10", marginBottom: "1.75rem" }}>
              {t("p7")}
              <br />
              Love,
              <br />
              Ruth ❤
            </p>

            <Link href="/about" className="btn-primary">
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
