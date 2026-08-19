"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { validatePassword, PASSWORD_REQUIREMENTS_TEXT } from "@/lib/password";
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

export default function ResetPasswordPage() {
  const [checking, setChecking] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setSessionReady(!!data.session);
      setChecking(false);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    const pw = validatePassword(password);
    if (!pw.valid) {
      setError(pw.error!);
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
  }

  return (
    <section
      className="section-padding min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fdf8f2" }}
    >
      <div className="container-max" style={{ maxWidth: "440px", width: "100%" }}>
        <AnimateIn direction="none">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#a38d51",
              marginBottom: "0.5rem",
            }}>HOLIU</p>
            <h1 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "#2c2520",
            }}>Set New Password</h1>
          </div>

          <div style={{
            background: "white",
            borderRadius: "1.5rem",
            padding: "2.5rem",
            boxShadow: "0 20px 60px rgba(44,37,32,0.08)",
            border: "1px solid rgba(163,141,81,0.1)",
          }}>
            {checking ? (
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "#7a6f66", margin: 0 }}>Loading…</p>
            ) : !sessionReady ? (
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "#dc2626", lineHeight: 1.7, margin: 0 }}>
                This reset link is invalid or has expired. Please request a new one.
              </p>
            ) : done ? (
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "#5a4a3a", lineHeight: 1.7, margin: 0 }}>
                Your password has been updated. You can now log in with your new password.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#7a6f66", display: "block", marginBottom: "0.5rem" }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    maxLength={16}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                  />
                  <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "#b0a898", marginTop: "0.4rem", marginBottom: 0 }}>
                    {PASSWORD_REQUIREMENTS_TEXT}
                  </p>
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#7a6f66", display: "block", marginBottom: "0.5rem" }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                {error && (
                  <p style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: "0.5rem", padding: "0.75rem 1rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "#dc2626", margin: 0 }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? "…" : "Set New Password"}
                </button>
              </form>
            )}
          </div>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "#7a6f66" }}>
            <Link href="/account/login" style={{ color: "#a38d51", textDecoration: "underline" }}>
              ← Back to login
            </Link>
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
