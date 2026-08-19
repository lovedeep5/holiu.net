"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { extractHashTokens } from "@/lib/auth-hash";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";

export default function ConfirmAccountPage() {
  const locale = useLocale();
  const [error, setError] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function init() {
      const tokens = extractHashTokens();
      if (!tokens) {
        setError(true);
        return;
      }
      const { error } = await supabase.auth.setSession(tokens);
      if (error) {
        setError(true);
        return;
      }
      window.location.replace(`/${locale}/account`);
    }

    init();
  }, [locale]);

  return (
    <section
      className="section-padding min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fdf8f2" }}
    >
      <div className="container-max" style={{ maxWidth: "440px", width: "100%", textAlign: "center" }}>
        <AnimateIn direction="none">
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
            marginBottom: "1.5rem",
          }}>
            {error ? "Confirmation link invalid" : "Confirming your account…"}
          </h1>
          {error && (
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.9rem", color: "#7a6f66" }}>
              This link is invalid or has expired.{" "}
              <Link href="/account/login" style={{ color: "#a38d51", textDecoration: "underline" }}>
                Back to login
              </Link>
            </p>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
