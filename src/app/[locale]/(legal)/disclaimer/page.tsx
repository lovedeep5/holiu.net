import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return { title: t("disclaimer") };
}

export default function DisclaimerPage() {
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
          Legal Disclaimer
        </h1>
        <div
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "#7a6f66",
          }}
        >
          <h2 style={{ color: "#2c2520", fontFamily: "var(--font-playfair), Georgia, serif" }}>Limitation of Liability</h2>
          <p>The content of this website has been compiled with careful regard for accuracy. HOLIU / Ruth Heinen accepts no liability for the accuracy, completeness or up-to-date nature of the content.</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>No Medical Advice</h2>
          <p>The meditations, courses and coaching offered through holiu.net are for personal growth and spiritual development only. They do not constitute medical or psychological advice and are not a substitute for professional medical treatment.</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>External Links</h2>
          <p>This website may contain links to third-party websites. HOLIU has no control over those sites and accepts no responsibility for their content.</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>Copyright</h2>
          <p>All content on holiu.net (text, images, audio, video) is protected by copyright. Reproduction requires prior written consent from Ruth Heinen.</p>
        </div>
      </div>
    </section>
  );
}
