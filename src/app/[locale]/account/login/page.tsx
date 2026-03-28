"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";

export default function AccountLoginPage() {
  const t = useTranslations("account");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  return (
    <section
      className="section-padding min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fdf8f2" }}
    >
      <div className="container-max" style={{ maxWidth: "440px", width: "100%" }}>
        <AnimateIn direction="none">
          {/* Logo mark */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#a38d51",
                marginBottom: "0.5rem",
              }}
            >
              HOLIU
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#2c2520",
              }}
            >
              {mode === "login" ? t("login") : t("signup")}
            </h1>
          </div>

          {/* Card */}
          <div
            style={{
              background: "white",
              borderRadius: "1.5rem",
              padding: "2.5rem",
              boxShadow: "0 20px 60px rgba(44,37,32,0.08)",
              border: "1px solid rgba(163,141,81,0.1)",
            }}
          >
            {/* Mode toggle */}
            <div
              style={{
                display: "flex",
                borderRadius: "0.75rem",
                background: "rgba(163,141,81,0.08)",
                padding: "0.25rem",
                marginBottom: "2rem",
              }}
            >
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    flex: 1,
                    padding: "0.625rem",
                    borderRadius: "0.5rem",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    background: mode === m ? "white" : "transparent",
                    color: mode === m ? "#2c2520" : "#7a6f66",
                    boxShadow: mode === m ? "0 2px 8px rgba(44,37,32,0.08)" : "none",
                  }}
                >
                  {m === "login" ? t("login") : t("signup")}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                // TODO: wire to Supabase Auth
                setTimeout(() => setLoading(false), 1000);
              }}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {mode === "signup" && (
                <div>
                  <label
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#7a6f66",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t("name")}
                  </label>
                  <input
                    type="text"
                    required={mode === "signup"}
                    style={{
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
                    }}
                  />
                </div>
              )}

              <div>
                <label
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#7a6f66",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  required
                  style={{
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
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#7a6f66",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("password")}
                </label>
                <input
                  type="password"
                  required
                  style={{
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
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "..." : mode === "login" ? t("login") : t("signup")}
              </button>
            </form>
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.8rem",
              color: "#7a6f66",
            }}
          >
            <Link href="/shop" style={{ color: "#a38d51", textDecoration: "underline" }}>
              Continue shopping without an account →
            </Link>
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
