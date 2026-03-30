"use client";

import { Link } from "@/i18n/navigation";

export default function VisitShop() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#fce4dc" }}>
      <div className="container-max">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              color: "#2c2520",
              fontWeight: 700,
              fontStyle: "italic",
              margin: 0,
            }}
          >
            Visit Our Shop
          </h2>
          <Link
            href="/shop"
            style={{
              backgroundColor: "#e8a898",
              color: "white",
              padding: "0.5rem 1.4rem",
              borderRadius: "2rem",
              textDecoration: "none",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            View
          </Link>
        </div>
      </div>
    </section>
  );
}
