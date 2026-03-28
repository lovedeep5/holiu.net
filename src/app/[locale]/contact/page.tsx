"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section-padding bg-brand-cream min-h-screen pt-40">
      <div className="container-max" style={{ maxWidth: "680px" }}>
        <AnimateIn>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#a38d51",
              marginBottom: "1rem",
            }}
          >
            Contact
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#2c2520",
              marginBottom: "0.75rem",
            }}
          >
            {t("heading")}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              color: "#7a6f66",
              marginBottom: "2.5rem",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            {t("subheading")}
          </p>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          {status === "success" ? (
            <div
              style={{
                background: "rgba(163,141,81,0.1)",
                border: "1px solid #a38d51",
                borderRadius: "1rem",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "#a38d51",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                {t("successMessage")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#7a6f66",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  {t("name")}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem",
                    border: "1px solid rgba(163,141,81,0.3)",
                    borderRadius: "0.75rem",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.95rem",
                    color: "#2c2520",
                    background: "white",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#7a6f66",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  {t("email")} *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem",
                    border: "1px solid rgba(163,141,81,0.3)",
                    borderRadius: "0.75rem",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.95rem",
                    color: "#2c2520",
                    background: "white",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#7a6f66",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  {t("message")} *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem",
                    border: "1px solid rgba(163,141,81,0.3)",
                    borderRadius: "0.75rem",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.95rem",
                    color: "#2c2520",
                    background: "white",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {status === "error" && (
                <p style={{ color: "#e84e3b", fontSize: "0.875rem", fontFamily: "var(--font-montserrat), sans-serif" }}>
                  {t("errorMessage")}
                </p>
              )}

              <button type="submit" disabled={status === "sending"} className="btn-primary" style={{ alignSelf: "flex-start" }}>
                {status === "sending" ? "Sending…" : t("send")}
              </button>
            </form>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
