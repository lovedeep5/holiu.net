"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "0.625rem",
  border: "1px solid rgba(163,141,81,0.25)",
  fontFamily: "var(--font-montserrat), sans-serif",
  fontSize: "0.9rem",
  color: "#2c2520",
  background: "#fdf8f2",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-montserrat), sans-serif",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#7a6f66",
  display: "block",
  marginBottom: "0.5rem",
};

export default function AccountProfilePage() {
  const t = useTranslations("account");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // TODO: wire to Supabase Auth update
  }

  return (
    <section className="section-padding min-h-screen" style={{ backgroundColor: "#fdf8f2", paddingTop: "8rem" }}>
      <div className="container-max" style={{ maxWidth: "560px" }}>
        <AnimateIn>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            <Link
              href="/account"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.8rem",
                color: "#a38d51",
                textDecoration: "none",
              }}
            >
              ← {t("dashboard")}
            </Link>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "#2c2520",
              }}
            >
              {t("profile")}
            </h1>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "1.5rem",
              padding: "2.5rem",
              boxShadow: "0 8px 40px rgba(44,37,32,0.06)",
              border: "1px solid rgba(163,141,81,0.1)",
            }}
          >
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>{t("name")}</label>
                <input type="text" style={inputStyle} placeholder="Your full name" />
              </div>
              <div>
                <label style={labelStyle}>{t("email")}</label>
                <input type="email" style={inputStyle} placeholder="your@email.com" />
              </div>

              <hr style={{ border: "none", borderTop: "1px solid rgba(163,141,81,0.15)", margin: "0.5rem 0" }} />

              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#a38d51",
                }}
              >
                Change Password
              </p>
              <div>
                <label style={labelStyle}>New Password</label>
                <input type="password" style={inputStyle} placeholder="••••••••" />
              </div>
              <div>
                <label style={labelStyle}>Confirm New Password</label>
                <input type="password" style={inputStyle} placeholder="••••••••" />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ justifyContent: "center" }}
              >
                {saved ? "Saved ✓" : "Save Changes"}
              </button>
            </form>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
