"use client";

import { useState } from "react";
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/account/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
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
            }}>Reset Password</h1>
          </div>

          <div style={{
            background: "white",
            borderRadius: "1.5rem",
            padding: "2.5rem",
            boxShadow: "0 20px 60px rgba(44,37,32,0.08)",
            border: "1px solid rgba(163,141,81,0.1)",
          }}>
            {done ? (
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "#5a4a3a", lineHeight: 1.7, margin: 0 }}>
                If that email is registered, we&apos;ve sent a password reset link. Check your inbox.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "#7a6f66", margin: 0 }}>
                  Enter your account email and we&apos;ll send you a link to reset your password.
                </p>
                <div>
                  <label style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#7a6f66", display: "block", marginBottom: "0.5rem" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "…" : "Send Reset Link"}
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
