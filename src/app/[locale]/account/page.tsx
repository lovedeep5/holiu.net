import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";
import LogoutButton from "@/components/account/LogoutButton";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const t = await getTranslations("account");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#2c2520",
                  marginBottom: "0.25rem",
                }}
              >
                {t("dashboard")}
              </h1>
              {user?.email && (
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "#7a6f66" }}>
                  {user.email}
                </p>
              )}
            </div>
            <LogoutButton />
          </div>

          {/* Quick nav */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
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
