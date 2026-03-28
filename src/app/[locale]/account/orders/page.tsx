import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";

export default function AccountOrdersPage() {
  const t = useTranslations("account");

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

          {/* Empty state — will be populated when Supabase Auth is wired */}
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
            <p
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "1.25rem",
                color: "#2c2520",
                marginBottom: "0.75rem",
              }}
            >
              {t("noOrders")}
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.875rem",
                color: "#7a6f66",
                marginBottom: "2rem",
              }}
            >
              Your purchases will appear here after checkout.
            </p>
            <Link href="/shop" className="btn-primary">
              Browse the Shop
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
