import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return { title: t("imprint") };
}

const section: React.CSSProperties = { marginTop: "2rem" };
const h2: React.CSSProperties = {
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontSize: "1.1rem",
  color: "#2c2520",
  fontWeight: 600,
  marginBottom: "0.5rem",
};
const p: React.CSSProperties = {
  fontFamily: "var(--font-montserrat), sans-serif",
  fontSize: "0.9rem",
  lineHeight: 1.85,
  color: "#5a4a3a",
  marginBottom: "0.75rem",
};

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

        <div style={p}>
          <p style={p}>The offer and sale of products on this website is made directly by:</p>

          <p style={p}>
            <strong>HOLIU — Holistic Lifestyle Universe</strong><br />
            Duisburger Strasse 44<br />
            40477 Düsseldorf<br />
            Germany<br />
            Phone: +49 (0)211-2304420<br />
            Email: <a href="mailto:contact@holiu.net" style={{ color: "#a38d51" }}>contact@holiu.net</a><br />
            Owner: Ruth Heinen<br />
            V.A.T. number: DE 813 205 846
          </p>

          <p style={p}>
            The trademarks of all products offered on this website are the exclusive property of their respective owners.
          </p>

          <div style={section}>
            <h2 style={h2}>Liability for Content</h2>
            <p style={p}>
              We strive to keep the content of our site up to date. Despite careful processing and control,
              liability is excluded. According to §§ 8 to 10 TMG, we are not obliged to monitor transmitted
              or stored third-party information. Upon notification of violations, we will remove this content
              immediately. The content of this website is protected by copyright. Use for purposes other than
              ordering goods is prohibited. If you need pictures for commercial use, please contact us at{" "}
              <a href="mailto:contact@holiu.net" style={{ color: "#a38d51" }}>contact@holiu.net</a>.
            </p>
          </div>

          <div style={section}>
            <h2 style={h2}>Liability for Links</h2>
            <p style={p}>
              Our offer contains links to external websites of third parties on whose contents we have no
              influence. The respective provider or operator of the pages is always responsible for the
              contents of the linked pages. No guarantee is given for the contents and the correctness of
              the information of linked websites of foreign information providers.
            </p>
          </div>

          <div style={section}>
            <h2 style={h2}>Online Dispute Resolution</h2>
            <p style={p}>
              Information on online dispute resolution: The EU Commission has launched an internet platform
              for online settlement of disputes (&ldquo;the OS platform&rdquo;). The OS platform serves as
              a focal point for extrajudicial settlement of disputes concerning contractual obligations
              arising from online sales contracts. The customer can access the OS platform at the following
              link:{" "}
              <a
                href="http://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#a38d51" }}
              >
                http://ec.europa.eu/consumers/odr/
              </a>
            </p>
          </div>

          <div style={section}>
            <p style={{ ...p, fontSize: "0.8rem", color: "#7a6f66" }}>
              Responsible for journalistic-editorial content according to § 55 Abs. 2 RStV: Ruth Heinen
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
