"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface DownloadItem {
  product: { id: string; name_en: string; name_de: string | null; thumbnail_url: string | null };
  price_paid: number;
  download_url: string | null;
  expires_at: string | null;
}

interface OrderData {
  order_id: string;
  email: string;
  items: DownloadItem[];
}

function SuccessContent() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(!!sessionId);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setLoggedIn(!!data.user));
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/order?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => { if (!data.error) setOrder(data); })
      .finally(() => setLoading(false));
  }, [sessionId]);

  const formatExpiry = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "de" ? "de-DE" : "en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });

  return (
    <section
      className="section-padding min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fdf8f2", paddingTop: "8rem" }}
    >
      <div className="container-max" style={{ maxWidth: "640px", width: "100%" }}>
        <AnimateIn direction="none">
          {/* Checkmark */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "rgba(163,141,81,0.12)",
              border: "2px solid rgba(163,141,81,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2rem",
              fontSize: "1.75rem",
            }}
          >
            ✓
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "#2c2520",
              lineHeight: 1.2,
              marginBottom: "1rem",
              textAlign: "center",
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
              textAlign: "center",
            }}
          >
            {t("successBody")}
          </p>

          {/* Downloads */}
          {loading && (
            <div style={{ textAlign: "center", color: "#a38d51", marginBottom: "2rem" }}>
              Loading your downloads…
            </div>
          )}

          {!loading && order && order.items.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#a38d51",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Your Downloads
              </p>
              {order.items.map((item, i) => {
                const name = locale === "de" && item.product.name_de ? item.product.name_de : item.product.name_en;
                return (
                  <div
                    key={i}
                    style={{
                      background: "white",
                      borderRadius: "1rem",
                      padding: "1.25rem 1.5rem",
                      marginBottom: "0.75rem",
                      border: "1px solid rgba(163,141,81,0.12)",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    {item.product.thumbnail_url && (
                      <Image
                        src={item.product.thumbnail_url}
                        alt={name}
                        width={52}
                        height={52}
                        style={{ borderRadius: "0.5rem", objectFit: "cover" }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#2c2520", marginBottom: "0.2rem" }}>
                        {name}
                      </p>
                      {item.expires_at && (
                        <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "#a38d51" }}>
                          {t("expiresIn")} — {formatExpiry(item.expires_at)}
                        </p>
                      )}
                    </div>
                    {item.download_url && (
                      <a
                        href={item.download_url}
                        className="btn-primary"
                        style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem", whiteSpace: "nowrap" }}
                      >
                        Download
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Account nudge — only shown when not logged in */}
          {loggedIn === false && (
            <div
              style={{
                background: "linear-gradient(135deg, #fdf8f2 0%, #f5ede0 100%)",
                borderRadius: "1rem",
                padding: "1.5rem",
                marginBottom: "2rem",
                border: "1px solid rgba(163,141,81,0.15)",
                textAlign: "center",
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
          )}

          {/* Already logged in — link to their orders */}
          {loggedIn === true && (
            <div
              style={{
                background: "linear-gradient(135deg, #fdf8f2 0%, #f5ede0 100%)",
                borderRadius: "1rem",
                padding: "1.5rem",
                marginBottom: "2rem",
                border: "1px solid rgba(163,141,81,0.15)",
                textAlign: "center",
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
                Your purchase has been saved to your account.
              </p>
              <Link href="/account/orders" className="btn-outline" style={{ fontSize: "0.8rem" }}>
                View My Orders
              </Link>
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <Link href="/shop" className="btn-primary">
              {t("backToShop")}
            </Link>
          </div>
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
