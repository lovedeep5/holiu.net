import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CheckoutCancelPage() {
  const t = useTranslations("checkout");

  return (
    <section
      className="section-padding min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fdf8f2" }}
    >
      <div className="container-max" style={{ maxWidth: "520px", textAlign: "center" }}>
        <AnimateIn direction="none">
          {/* Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(252,136,85,0.1)",
              border: "2px solid rgba(252,136,85,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2rem",
              fontSize: "2rem",
            }}
          >
            ×
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
            {t("cancelHeading")}
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
            {t("cancelBody")}
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop" className="btn-primary">
              {t("backToShop")}
            </Link>
            <Link href="/meditation" className="btn-outline">
              Free Meditation
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
