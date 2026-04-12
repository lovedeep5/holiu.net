import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return { title: t("imprint") };
}

export default function ImprintPage() {
  return (
    <section className="section-padding bg-brand-cream min-h-screen pt-40">
      <div className="container-max" style={{ maxWidth: "760px" }}>
        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#2c2520",
            marginBottom: "2rem",
          }}
        >
          Imprint
        </h1>
        <div
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "#7a6f66",
          }}
        >
          <p><strong>Responsible for content:</strong></p>
          <p>Ruth Heinen<br />HOLIU — Holistic Lifestyle Universe<br />Germany</p>
          <p style={{ marginTop: "1rem" }}><strong>Email:</strong> info@holiu.net</p>
          <p style={{ marginTop: "1rem" }}><strong>Website:</strong> https://holiu.net</p>
          <p style={{ marginTop: "1.5rem" }}>
            Responsible for journalistic-editorial content according to § 55 Abs. 2 RStV: Ruth Heinen
          </p>
        </div>
      </div>
    </section>
  );
}
