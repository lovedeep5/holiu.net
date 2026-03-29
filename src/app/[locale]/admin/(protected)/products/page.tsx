import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";

export default async function AdminProductsPage() {
  const supabase = createServiceClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, slug, name_en, category, price, featured, published")
    .order("category")
    .order("name_en");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", color: "white" }}>Products</h1>
        <Link
          href="/en/admin/products/new"
          style={{
            padding: "0.6rem 1.25rem",
            background: "#fc8855",
            borderRadius: "0.5rem",
            color: "white",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          + New Product
        </Link>
      </div>

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(163,141,81,0.1)", borderRadius: "1rem", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(163,141,81,0.1)" }}>
              {["Name", "Category", "Price", "Featured", "Published", ""].map((h) => (
                <th key={h} style={{
                  padding: "0.875rem 1rem",
                  textAlign: "left",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p: any) => (
              <tr
                key={p.id}
                style={{ borderBottom: "1px solid rgba(163,141,81,0.06)" }}
              >
                <td style={{ padding: "0.875rem 1rem" }}>
                  <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "white" }}>{p.name_en}</p>
                  <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>{p.slug}</p>
                </td>
                <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  {p.category}
                </td>
                <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "#a38d51", fontWeight: 600 }}>
                  €{(p.price / 100).toFixed(0)}
                </td>
                <td style={{ padding: "0.875rem 1rem" }}>
                  <span style={{ color: p.featured ? "#86efac" : "rgba(255,255,255,0.2)", fontSize: "0.85rem" }}>
                    {p.featured ? "★" : "☆"}
                  </span>
                </td>
                <td style={{ padding: "0.875rem 1rem" }}>
                  <PublishedToggle id={p.id} published={p.published} />
                </td>
                <td style={{ padding: "0.875rem 1rem" }}>
                  <Link
                    href={`/en/admin/products/${p.id}/edit`}
                    style={{
                      padding: "0.35rem 0.75rem",
                      border: "1px solid rgba(163,141,81,0.3)",
                      borderRadius: "0.375rem",
                      color: "#a38d51",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PublishedToggle({ id, published }: { id: string; published: boolean }) {
  return (
    <form action={`/api/admin/products/${id}/toggle`} method="POST">
      <button
        type="submit"
        style={{
          padding: "0.25rem 0.6rem",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          background: published ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.08)",
          color: published ? "#86efac" : "rgba(255,255,255,0.35)",
        }}
      >
        {published ? "Live" : "Draft"}
      </button>
    </form>
  );
}
