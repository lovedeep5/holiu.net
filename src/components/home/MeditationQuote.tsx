import { getTranslations } from "next-intl/server";

export default async function MeditationQuote() {
  const t = await getTranslations("home.quote");

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div
        className="absolute top-6 left-8"
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "8rem",
          lineHeight: 1,
          color: "#e8d5c0",
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="container-max relative">
        <blockquote
          className="max-w-3xl mx-auto text-center"
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            fontWeight: 600,
            lineHeight: 1.9,
            color: "#c9a84c",
            letterSpacing: "0.02em",
          }}
        >
          {t("text")}
        </blockquote>
      </div>
    </section>
  );
}
