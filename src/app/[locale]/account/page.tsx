import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";

export default function AccountPage() {
  const t = useTranslations("account");

  return (
    <section className="section-padding min-h-screen" style={{ backgroundColor: "#fdf8f2", paddingTop: "8rem" }}>
      <div className="container-max" style={{ maxWidth: "800px" }}>
        <AnimateIn>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#a38d51",
              marginBottom: "0.5rem",
            }}
          >
            HOLIU
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#2c2520",
              marginBottom: "3rem",
            }}
          >
            {t("dashboard")}
          </h1>

          {/* Quick nav */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
              marginBottom: "3rem",
            }}
            className="md:grid-cols-2 grid-cols-1"
          >
            {[
              { href: "/account/orders", label: t("orders"), icon: "📦", desc: "View all purchases & download your files" },
              { href: "/account/profile", label: t("profile"), icon: "✏️", desc: "Update your name, email and password" },
            ].map((item) => (
              <Link key={item.href} href={item.href as any} className="group block">
                <div
                  style={{
                    background: "white",
                    borderRadius: "1.25rem",
                    padding: "2rem",
                    border: "1px solid rgba(163,141,81,0.12)",
                    transition: "box-shadow 0.2s",
                  }}
                  className="group-hover:shadow-lg"
                >
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontSize: "1.25rem",
                      color: "#2c2520",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.875rem",
                      color: "#7a6f66",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/shop" className="btn-outline">
            Back to Shop
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
