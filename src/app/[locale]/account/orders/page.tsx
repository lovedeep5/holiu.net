import { redirect } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export default async function AccountOrdersPage() {
  const t = await getTranslations("account");
  const locale = await getLocale();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/account/login`);

  // Fetch orders by user_id OR email (covers orders placed before user_id tracking)
  const service = createServiceClient();
  const { data: orders } = await service
    .from("orders")
    .select(`
      id,
      stripe_session_id,
      customer_email,
      status,
      created_at,
      order_items (
        id,
        price_paid,
        products ( id, name_en, name_de, thumbnail_url ),
        download_tokens ( token, expires_at, used )
      )
    `)
    .or(`user_id.eq.${user.id},customer_email.eq.${user.email}`)
    .eq("status", "paid" as any)
    .order("created_at", { ascending: false });

  return (
    <section className="section-padding min-h-screen" style={{ backgroundColor: "#fdf8f2", paddingTop: "8rem" }}>
      <div className="container-max" style={{ maxWidth: "800px" }}>
        <AnimateIn>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            <Link
              href="/account"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.8rem",
                color: "#a38d51",
                textDecoration: "none",
              }}
            >
              ← {t("dashboard")}
            </Link>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "#2c2520",
              }}
            >
              {t("orders")}
            </h1>
          </div>

          {!orders?.length ? (
            <div
              style={{
                background: "white",
                borderRadius: "1.5rem",
                padding: "4rem 2rem",
                textAlign: "center",
                border: "1px solid rgba(163,141,81,0.1)",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📦</div>
              <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.25rem", color: "#2c2520", marginBottom: "0.75rem" }}>
                {t("noOrders")}
              </p>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.875rem", color: "#7a6f66", marginBottom: "2rem" }}>
                Your purchases will appear here after checkout.
              </p>
              <Link href="/shop" className="btn-primary">Browse the Shop</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {(orders as any[]).map((order) => {
                const items: any[] = order.order_items ?? [];
                const total = items.reduce((sum: number, i: any) => sum + (i.price_paid ?? 0), 0);
                const date = new Date(order.created_at).toLocaleDateString(
                  locale === "de" ? "de-DE" : "en-GB",
                  { day: "numeric", month: "long", year: "numeric" }
                );

                return (
                  <div
                    key={order.id}
                    style={{
                      background: "white",
                      borderRadius: "1.25rem",
                      border: "1px solid rgba(163,141,81,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Order header */}
                    <div
                      style={{
                        padding: "1rem 1.5rem",
                        borderBottom: "1px solid rgba(163,141,81,0.08)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        background: "rgba(163,141,81,0.03)",
                      }}
                    >
                      <div>
                        <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a38d51" }}>
                          {date}
                        </p>
                        <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "#7a6f66", marginTop: "0.15rem" }}>
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                      <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem", color: "#2c2520", fontWeight: 600 }}>
                        €{(total / 100).toFixed(2)}
                      </p>
                    </div>

                    {/* Items */}
                    <div style={{ padding: "0.75rem 0" }}>
                      {items.map((item: any) => {
                        const product = item.products;
                        const name = locale === "de" && product?.name_de ? product.name_de : product?.name_en;
                        const token = item.download_tokens?.[0];
                        const expired = token?.expires_at ? new Date(token.expires_at) < new Date() : false;
                        const expiry = token?.expires_at
                          ? new Date(token.expires_at).toLocaleDateString(locale === "de" ? "de-DE" : "en-GB", { day: "numeric", month: "short", year: "numeric" })
                          : null;

                        return (
                          <div
                            key={item.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                              padding: "0.875rem 1.5rem",
                              borderBottom: "1px solid rgba(163,141,81,0.06)",
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#2c2520", marginBottom: "0.2rem" }}>
                                {name ?? "—"}
                              </p>
                              {expiry && (
                                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: expired ? "#dc2626" : "#a38d51" }}>
                                  {expired ? "Download expired" : `Expires ${expiry}`}
                                </p>
                              )}
                            </div>
                            {token && !expired && (
                              <a
                                href={`/api/downloads/${token.token}`}
                                style={{
                                  flexShrink: 0,
                                  padding: "0.5rem 1.1rem",
                                  borderRadius: "0.5rem",
                                  background: "#2c2520",
                                  color: "white",
                                  fontFamily: "var(--font-montserrat), sans-serif",
                                  fontSize: "0.72rem",
                                  fontWeight: 600,
                                  letterSpacing: "0.05em",
                                  textDecoration: "none",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Download
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
