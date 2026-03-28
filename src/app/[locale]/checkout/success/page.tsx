"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const t = useTranslations("checkout");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <section
      className="section-padding min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fdf8f2" }}
    >
      <div className="container-max" style={{ maxWidth: "640px", textAlign: "center" }}>
        <AnimateIn direction="none">
          {/* Checkmark icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(163,141,81,0.12)",
              border: "2px solid rgba(163,141,81,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2rem",
              fontSize: "2rem",
            }}
          >
            ✓
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#2c2520",
              lineHeight: 1.2,
              marginBottom: "1.25rem",
            }}
          >
            {t("successHeading")}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "1rem",
              color: "#7a6f66",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            {t("successBody")}
          </p>

          {/* Download placeholder — will be populated via sessionId when Stripe is wired */}
          {sessionId && (
            <div
              style={{
                background: "white",
                borderRadius: "1.25rem",
                padding: "2rem",
                marginBottom: "2rem",
                boxShadow: "0 8px 40px rgba(44,37,32,0.06)",
                border: "1px solid rgba(163,141,81,0.12)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#a38d51",
                  marginBottom: "0.75rem",
                }}
              >
                Your Downloads
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.875rem",
                  color: "#7a6f66",
                }}
              >
                {t("expiresIn")}
              </p>
            </div>
          )}

          {/* Create account nudge */}
          <div
            style={{
              background: "linear-gradient(135deg, #fdf8f2 0%, #f5ede0 100%)",
              borderRadius: "1rem",
              padding: "1.5rem",
              marginBottom: "2rem",
              border: "1px solid rgba(163,141,81,0.15)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.875rem",
                color: "#7a6f66",
                lineHeight: 1.7,
                marginBottom: "1rem",
              }}
            >
              {t("createAccount")}
            </p>
            <Link href="/account/login" className="btn-outline" style={{ fontSize: "0.8rem" }}>
              Create Free Account
            </Link>
          </div>

          <Link href="/shop" className="btn-primary">
            {t("backToShop")}
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
