"use client";

import { useEffect, useState } from "react";

const COOKIE_DISMISSED = "holiu_optin_dismissed"; // expires 1 day
const COOKIE_SUBMITTED = "holiu_optin_done";       // never expires

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days?: number) {
  let expires = "";
  if (days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + d.toUTCString();
  }
  document.cookie = `${name}=${value}; path=/${expires}`;
}

export default function OptinModal() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (getCookie(COOKIE_SUBMITTED) || getCookie(COOKIE_DISMISSED)) return;
    // Check Supabase session client-side
    const sbSession = getCookie("sb-aoorajsokivjxmkgzwno-auth-token");
    if (sbSession) return;
    const timer = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    setCookie(COOKIE_DISMISSED, "1", 1); // 1 day
    setVisible(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "popup" }),
      });
      setCookie(COOKIE_SUBMITTED, "1"); // no expiry = never expires
      setStatus("done");
    } catch {
      setStatus("idle");
    }
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleDismiss}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(44,37,32,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 9998,
          animation: "fadeIn 0.3s ease",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "min(520px, 92vw)",
          background: "#fdf8f2",
          borderRadius: "1.5rem",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(44,37,32,0.3)",
          animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: "4px", background: "linear-gradient(90deg, #fc8855, #a38d51)" }} />

        {/* Close button */}
        <button
          onClick={handleDismiss}
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "none", border: "none", cursor: "pointer",
            fontSize: "1.25rem", color: "#a38d51", lineHeight: 1,
            padding: "0.25rem",
          }}
          aria-label="Close"
        >
          ✕
        </button>

        <div style={{ padding: "2.5rem 2.5rem 2rem" }}>
          {status === "done" ? (
            /* Success state */
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌸</div>
              <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.6rem", color: "#2c2520", fontWeight: 400, marginBottom: "0.75rem" }}>
                Thank you!
              </h2>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "#7a6f66", lineHeight: 1.7 }}>
                Your free meditation is on its way. Check your inbox soon. 💛
              </p>
            </div>
          ) : (
            <>
              {/* Heading */}
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a38d51", marginBottom: "0.5rem" }}>
                Free Gift
              </p>
              <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", color: "#2c2520", fontWeight: 400, lineHeight: 1.25, marginBottom: "0.75rem" }}>
                Get Your Free<br />Chakra Meditation
              </h2>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "#7a6f66", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                Discover inner peace in just 5 minutes a day. Enter your details and we&apos;ll send it straight to your inbox.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
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
                  }}
                />
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
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
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
                >
                  {status === "sending" ? "Sending…" : "Send Me the Free Meditation →"}
                </button>
              </form>

              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "#b0a898", textAlign: "center", marginTop: "1rem" }}>
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, calc(-50% + 24px)) } to { opacity: 1; transform: translate(-50%, -50%) } }
      `}</style>
    </>
  );
}
