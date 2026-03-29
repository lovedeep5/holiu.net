"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Login failed");
      setLoading(false);
      return;
    }

    window.location.href = "/en/admin";
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#1a1410" }}
    >
      <div style={{ width: "100%", maxWidth: "400px", padding: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#a38d51",
            marginBottom: "0.5rem",
          }}>HOLIU</p>
          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "1.75rem",
            color: "white",
          }}>Admin</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(163,141,81,0.2)",
            borderRadius: "1rem",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {error && (
            <p style={{
              background: "rgba(220,38,38,0.15)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: "0.5rem",
              padding: "0.75rem 1rem",
              color: "#fca5a5",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.8rem",
            }}>
              {error}
            </p>
          )}

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a38d51" }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(163,141,81,0.2)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.9rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a38d51" }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(163,141,81,0.2)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.9rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.875rem",
              background: loading ? "rgba(163,141,81,0.4)" : "#a38d51",
              border: "none",
              borderRadius: "0.5rem",
              color: "white",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}
