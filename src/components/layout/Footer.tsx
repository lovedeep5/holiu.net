"use client";

import { Link } from "@/i18n/navigation";

export default function Footer() {
  const infoLinks = [
    { href: "/privacy" as const, label: "Privacy Policy" },
    { href: "/terms" as const, label: "Terms & Conditions" },
    { href: "/disclaimer" as const, label: "Legal Disclaimer" },
    { href: "/imprint" as const, label: "Imprint" },
  ];

  const shopLinks = [
    { href: "/shop?cat=Chakra+Balancing" as const, label: "Chakra Balancing" },
    { href: "/shop?cat=Channeling" as const, label: "Channeling" },
    { href: "/shop?cat=Courses" as const, label: "Courses" },
    { href: "/shop?cat=Meditations" as const, label: "Meditations" },
    { href: "/shop?cat=Workshops" as const, label: "Workshops" },
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
              <h4 style={headingStyle}>INFOS</h4>
              {infoLinks.map((l) => (
                <Link key={l.href} href={l.href} style={linkStyle}>{l.label}</Link>
              ))}
            </div>

            {/* SHOP */}
            <div>
              <h4 style={headingStyle}>SHOP</h4>
              {shopLinks.map((l) => (
                <Link key={l.href} href={l.href} style={linkStyle}>{l.label}</Link>
              ))}
            </div>

            {/* Credits */}
            <div>
              <h4 style={headingStyle}>Credits</h4>
              <Link href="/credits" style={linkStyle}>Credits &amp; Cooperation</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — dark */}
      <div style={{ backgroundColor: "#2c2520", padding: "1.25rem 0" }}>
        <div
          className="container-max"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { href: "/account" as const, label: "My account" },
              { href: "/checkout" as const, label: "Checkout" },
              { href: "/shop" as const, label: "Cart" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.6)",
            margin: 0,
          }}>
            Copyright © HOLIU {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
