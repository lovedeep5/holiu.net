"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

export default function LogoutButton() {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/account/auth", { method: "DELETE" });
    window.location.href = `/${locale}/account/login`;
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        fontFamily: "var(--font-montserrat), sans-serif",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#7a6f66",
        background: "none",
        border: "1px solid rgba(163,141,81,0.3)",
        borderRadius: "0.5rem",
        padding: "0.5rem 1.25rem",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.6 : 1,
        transition: "all 0.2s",
      }}
    >
      {loading ? "…" : "Sign Out"}
    </button>
  );
}
