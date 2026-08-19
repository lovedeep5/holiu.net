"use client";

import { useCallback, useEffect, useState } from "react";

type LoginAttempt = {
  id: string;
  identifier_type: "email" | "ip";
  identifier_value: string;
  attempt_count: number;
  locked_until: string | null;
  last_attempt_at: string;
};

export default function AdminSettingsPage() {
  const [testMode, setTestMode] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);

  const [attempts, setAttempts] = useState<LoginAttempt[]>([]);
  const [attemptsLoading, setAttemptsLoading] = useState(true);
  const [unlockingId, setUnlockingId] = useState<string | null>(null);

  const loadAttempts = useCallback(async () => {
    setAttemptsLoading(true);
    const r = await fetch("/api/admin/security");
    const d = await r.json();
    setAttempts(d.attempts ?? []);
    setAttemptsLoading(false);
  }, []);

  useEffect(() => {
    fetch("/api/admin/stripe-mode")
      .then((r) => r.json())
      .then((d) => setTestMode(d.testMode));
    fetch("/api/admin/notification-email")
      .then((r) => r.json())
      .then((d) => {
        setAdminEmail(d.email);
        setEmailInput(d.email);
      });
    loadAttempts();
  }, [loadAttempts]);

  async function unlock(id: string) {
    setUnlockingId(id);
    await fetch("/api/admin/security", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setAttempts((prev) => prev.filter((a) => a.id !== id));
    setUnlockingId(null);
  }

  const isLocked = (a: LoginAttempt) => !!a.locked_until && new Date(a.locked_until).getTime() > Date.now();

  async function saveAdminEmail() {
    if (!emailInput.trim()) return;
    setEmailSaving(true);
    setEmailSaved(false);
    const res = await fetch("/api/admin/notification-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput.trim() }),
    });
    const data = await res.json();
    if (res.ok) {
      setAdminEmail(data.email);
      setEmailSaved(true);
      setTimeout(() => setEmailSaved(false), 2500);
    }
    setEmailSaving(false);
  }

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
              <p style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>
                configured ✓
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(163,141,81,0.1)",
        borderRadius: "1rem",
        padding: "2rem",
        maxWidth: "560px",
        marginTop: "1.5rem",
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
          Notifications
        </p>

        <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "white", marginBottom: "0.35rem" }}>
          Admin Alert Email
        </p>
        <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5, marginBottom: "1rem" }}>
          New signups, contact messages, and orders are sent to this address.
        </p>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder={adminEmail ?? "Loading…"}
            style={{
              flex: 1,
              padding: "0.6rem 0.85rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(163,141,81,0.25)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.8rem",
              outline: "none",
            }}
          />
          <button
            onClick={saveAdminEmail}
            disabled={emailSaving || !emailInput.trim() || emailInput.trim() === adminEmail}
            style={{
              flexShrink: 0,
              padding: "0.6rem 1.25rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(252,136,85,0.4)",
              background: "rgba(252,136,85,0.1)",
              color: "#fc8855",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              cursor: emailSaving || !emailInput.trim() || emailInput.trim() === adminEmail ? "not-allowed" : "pointer",
              opacity: emailSaving || !emailInput.trim() || emailInput.trim() === adminEmail ? 0.5 : 1,
              transition: "all 0.2s",
            }}
          >
            {emailSaving ? "Saving…" : emailSaved ? "Saved ✓" : "Save"}
          </button>
        </div>
      </div>

      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(163,141,81,0.1)",
        borderRadius: "1rem",
        padding: "2rem",
        maxWidth: "720px",
        marginTop: "1.5rem",
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
          Security — Login Attempts
        </p>

        <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
          3 failed logins locks an email or IP for 24 hours. Pending tries and active lockouts show here.
        </p>

        {attemptsLoading ? (
          <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>Loading…</p>
        ) : attempts.length === 0 ? (
          <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>No failed login attempts recorded.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(163,141,81,0.1)" }}>
                {["Type", "Identifier", "Attempts", "Status", ""].map((h) => (
                  <th key={h} style={{ padding: "0.6rem 0.5rem", textAlign: "left", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attempts.map((a) => {
                const locked = isLocked(a);
                return (
                  <tr key={a.id} style={{ borderBottom: "1px solid rgba(163,141,81,0.06)" }}>
                    <td style={{ padding: "0.6rem 0.5rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>{a.identifier_type}</td>
                    <td style={{ padding: "0.6rem 0.5rem", fontFamily: "monospace", fontSize: "0.78rem", color: "white" }}>{a.identifier_value}</td>
                    <td style={{ padding: "0.6rem 0.5rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>{a.attempt_count}</td>
                    <td style={{ padding: "0.6rem 0.5rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.72rem", fontWeight: 700, color: locked ? "#fca5a5" : "#a38d51" }}>
                      {locked ? `Locked until ${new Date(a.locked_until!).toLocaleString()}` : "Pending"}
                    </td>
                    <td style={{ padding: "0.6rem 0.5rem", textAlign: "right" }}>
                      <button
                        type="button"
                        disabled={unlockingId === a.id}
                        onClick={() => unlock(a.id)}
                        style={{ padding: "0.3rem 0.75rem", border: "1px solid rgba(163,141,81,0.3)", borderRadius: "0.4rem", background: "transparent", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.68rem", fontWeight: 600, cursor: unlockingId === a.id ? "wait" : "pointer" }}
                      >
                        {unlockingId === a.id ? "…" : "Unlock"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
