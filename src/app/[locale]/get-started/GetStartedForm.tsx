"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const inputStyle: React.CSSProperties = {
  padding: "0.8rem 1rem",
  border: "1px solid rgba(163,141,81,0.25)",
  borderRadius: "0.625rem",
  fontFamily: "var(--font-montserrat), sans-serif",
  fontSize: "0.9rem",
  color: "#2c2520",
  background: "white",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

export default function GetStartedForm() {
  const t = useTranslations("getStarted");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "get-started" }),
      });
      setStatus("done");
    } catch {
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div style={{ marginTop: "0.5rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #fdf0ea, #fce4dc)",
            border: "1px solid rgba(252,136,85,0.25)",
            borderRadius: "1rem",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🌸</div>
          <h3
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "1.4rem",
              color: "#2c2520",
              fontWeight: 400,
              marginBottom: "0.5rem",
            }}
          >
            {t("thankYou")}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.85rem",
              color: "#7a6f66",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
            }}
          >
            {t("thankYouBody")}
          </p>
          <a
            href="/audio/chakra-meditation.mp3"
            download="Chakra-Meditation-HOLIU.mp3"
            className="btn-primary"
            style={{ display: "inline-block", textDecoration: "none" }}
          >
            {t("downloadNow")} ↓
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginTop: "0.5rem" }}>
      <input
        type="text"
        placeholder={t("formNamePlaceholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="email"
        required
        placeholder={t("formEmailPlaceholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary"
        style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
      >
        {status === "sending" ? t("formSending") : t("formSubmit")}
      </button>
      <p
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.7rem",
          color: "#b0a898",
          textAlign: "center",
          margin: 0,
        }}
      >
        {t("noSpam")}
      </p>
    </form>
  );
}
