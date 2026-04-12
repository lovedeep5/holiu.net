"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  const infoLinks = [
    { href: "/privacy" as const, label: t("privacy") },
    { href: "/terms" as const, label: t("terms") },
    { href: "/disclaimer" as const, label: t("disclaimer") },
    { href: "/imprint" as const, label: t("imprint") },
  ];

  const shopLinks = [
    { href: "/shop?cat=Chakra+Balancing" as const, label: t("chakra") },
    { href: "/shop?cat=Channeling" as const, label: t("channeling") },
    { href: "/shop?cat=Courses" as const, label: t("courses") },
    { href: "/shop?cat=Meditations" as const, label: t("meditations") },
    { href: "/shop?cat=Workshops" as const, label: t("workshops") },
  ];

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.9rem",
    color: "#fc8855",
    textDecoration: "none",
    display: "block",
    marginBottom: "0.5rem",
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "#2c2520",
    marginBottom: "1.25rem",
    textTransform: "uppercase" as const,
  };

  return (
    <footer>
      {/* Main footer — peach background */}
      <div style={{ backgroundColor: "#fce4dc", padding: "4rem 0 3rem" }}>
        <div className="container-max">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2.5rem" }}>
            {/* INFOS */}
            <div>
              <h4 style={headingStyle}>{t("infos")}</h4>
              {infoLinks.map((l) => (
                <Link key={l.href} href={l.href} style={linkStyle}>{l.label}</Link>
              ))}
            </div>

            {/* SHOP */}
            <div>
              <h4 style={headingStyle}>{t("shopHeading")}</h4>
              {shopLinks.map((l) => (
                <Link key={l.href} href={l.href} style={linkStyle}>{l.label}</Link>
              ))}
            </div>

            {/* Credits */}
            <div>
              <h4 style={headingStyle}>{t("creditsHeading")}</h4>
              <Link href="/credits" style={linkStyle}>{t("creditsLink")}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — dark */}
      <div style={{ backgroundColor: "#2c2520", padding: "1.25rem 0" }}>
        <div
          className="container-max"
          style={{ textAlign: "center" }}
        >
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.6)",
            margin: 0,
          }}>
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
