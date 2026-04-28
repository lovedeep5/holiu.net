"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [testMode, setTestMode] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/stripe-mode")
      .then((r) => r.json())
      .then((d) => setTestMode(d.testMode));
  }, []);

  async function toggle() {
    if (testMode === null) return;
    setSaving(true);
    const next = !testMode;
    await fetch("/api/admin/stripe-mode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testMode: next }),
    });
    setTestMode(next);
    setSaving(false);
  }

  const isLive = testMode === false;

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", color: "white", marginBottom: "0.5rem" }}>
        Settings
      </h1>
      <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "3rem" }}>
        Site-wide configuration
      </p>

      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(163,141,81,0.1)",
        borderRadius: "1rem",
        padding: "2rem",
        maxWidth: "560px",
      }}>
        <p style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          marginBottom: "1.25rem",
        }}>
          Stripe
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "white", marginBottom: "0.35rem" }}>
              Payment Mode
            </p>
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
              {testMode === null
                ? "Loading…"
                : isLive
                ? "Real payments are enabled. Customers are charged."
                : "Test mode is on. No real charges occur."}
            </p>
          </div>

          {/* Toggle */}
          <button
            onClick={toggle}
            disabled={saving || testMode === null}
            style={{
              flexShrink: 0,
              position: "relative",
              width: "120px",
              padding: "0.6rem 1rem",
              borderRadius: "0.5rem",
              border: isLive
                ? "1px solid rgba(34,197,94,0.4)"
                : "1px solid rgba(252,136,85,0.4)",
              background: isLive
                ? "rgba(34,197,94,0.1)"
                : "rgba(252,136,85,0.1)",
              color: isLive ? "#86efac" : "#fc8855",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: saving || testMode === null ? "not-allowed" : "pointer",
              opacity: saving || testMode === null ? 0.5 : 1,
              transition: "all 0.2s",
            }}
          >
            {saving ? "Saving…" : isLive ? "● Live" : "◌ Test"}
          </button>
        </div>

        {/* Warning banner */}
        {testMode === true && (
          <div style={{
            marginTop: "1.5rem",
            padding: "0.875rem 1rem",
            background: "rgba(252,136,85,0.08)",
            border: "1px solid rgba(252,136,85,0.2)",
            borderRadius: "0.5rem",
          }}>
            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.75rem",
              color: "#fc8855",
              lineHeight: 1.6,
            }}>
              <strong>Test mode is active.</strong> The buy button will use Stripe test keys — use card <code style={{ background: "rgba(255,255,255,0.08)", padding: "0.1em 0.35em", borderRadius: "0.25rem" }}>4242 4242 4242 4242</code> to complete a test purchase.
            </p>
          </div>
        )}

        {/* Hint row */}
        <div style={{
          marginTop: "1.25rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid rgba(163,141,81,0.08)",
          display: "flex",
          gap: "1.5rem",
        }}>
          {[
            { label: "Live key", value: "sk_live_…" + (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.slice(-6) ?? "") },
            { label: "Test key", value: "sk_test_…" },
          ].map((k) => (
            <div key={k.label}>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.2rem" }}>
                {k.label}
              </p>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
                configured ✓
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
