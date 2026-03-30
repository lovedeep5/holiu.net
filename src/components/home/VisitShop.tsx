import { Link } from "@/i18n/navigation";

export default function VisitShop() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#fce4dc", padding: "3rem 1.5rem" }}
    >
      <div
        className="container-max flex items-center justify-between gap-6"
      >
        <h2
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: "#2c2520",
            fontWeight: 400,
            margin: 0,
          }}
        >
          Visit Our Shop
        </h2>

        <Link
          href="/shop"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fc8855",
            color: "white",
            padding: "0.6rem 2rem",
            borderRadius: "2rem",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          View
        </Link>
      </div>
    </section>
  );
}
