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

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // TODO: wire name/email to Supabase Auth update
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError(null);
    setPwSaved(false);

    if (newPassword !== confirmPassword) {
      setPwError("New password and confirmation don't match.");
      return;
    }

    setPwSaving(true);
    const res = await fetch("/api/account/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    setPwSaving(false);

    if (!res.ok) {
      setPwError(data.error || "Failed to change password.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 2500);
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
                <input type="text" style={inputStyle} placeholder={t("namePlaceholder")} />
              </div>
              <div>
                <label style={labelStyle}>{t("email")}</label>
                <input type="email" style={inputStyle} placeholder={t("emailPlaceholder")} />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ justifyContent: "center" }}
              >
                {saved ? t("saved") : t("saveChanges")}
              </button>
            </form>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "1.5rem",
              padding: "2.5rem",
              boxShadow: "0 8px 40px rgba(44,37,32,0.06)",
              border: "1px solid rgba(163,141,81,0.1)",
              marginTop: "1.5rem",
            }}
          >
            <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#a38d51",
                  margin: 0,
                }}
              >
                {t("changePassword")}
              </p>

              <div>
                <label style={labelStyle}>Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={inputStyle}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label style={labelStyle}>{t("newPassword")}</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  maxLength={16}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={inputStyle}
                  placeholder="••••••••"
                />
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "#b0a898", marginTop: "0.4rem", marginBottom: 0 }}>
                  8-16 characters, with at least one letter, one number, and one special character.
                </p>
              </div>
              <div>
                <label style={labelStyle}>{t("confirmPassword")}</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={inputStyle}
                  placeholder="••••••••"
                />
              </div>

              {pwError && (
                <p style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: "0.5rem", padding: "0.75rem 1rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "#dc2626", margin: 0 }}>
                  {pwError}
                </p>
              )}

              <button
                type="submit"
                disabled={pwSaving}
                className="btn-primary"
                style={{ justifyContent: "center", opacity: pwSaving ? 0.7 : 1 }}
              >
                {pwSaving ? "…" : pwSaved ? t("saved") : t("changePassword")}
              </button>
            </form>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
