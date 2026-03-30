"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("home.contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact" }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "0.5rem",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.9rem",
    color: "#2c2520",
    outline: "none",
    background: "rgba(255,255,255,0.88)",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.75)",
    marginBottom: "0.4rem",
  };

  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#2c2520" }}>
      <div className="absolute inset-0">
        <img src="/images/backgrounds/baner2.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
      </div>

      <div className="container-max relative z-10">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "white", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            {t("heading")}
          </h2>
          <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
            {t("sub")}
          </p>
        </div>

        {status === "sent" ? (
          <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "1rem", textAlign: "center" }}>
            {t("sent")}
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label htmlFor="cname" style={labelStyle}>{t("name")}</label>
              <input id="cname" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label htmlFor="cemail" style={labelStyle}>{t("email")}</label>
              <input id="cemail" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label htmlFor="cmessage" style={labelStyle}>{t("message")}</label>
              <textarea id="cmessage" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <button type="submit" disabled={status === "sending"} style={{ backgroundColor: "#fc8855", color: "white", padding: "0.75rem 2.5rem", borderRadius: "2rem", border: "none", cursor: status === "sending" ? "wait" : "pointer", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {status === "sending" ? t("sending") : t("send")}
              </button>
              {status === "error" && (
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "#fca5a5", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  {t("error")}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
