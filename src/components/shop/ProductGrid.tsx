"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { STATIC_PRODUCTS, CATEGORIES } from "@/lib/static-products";

const PER_PAGE = 12;

function formatPrice(cents: number) {
  return (cents / 100).toFixed(2).replace(".", ",") + " €";
}

type SortKey = "default" | "price-asc" | "price-desc";

export default function ProductGrid() {
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("default");
  const [page, setPage] = useState(1);

  // Category counts (always from full list)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of STATIC_PRODUCTS) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  // Filter
  const filtered = useMemo(() => {
    const base =
      activeCategory === "All"
        ? STATIC_PRODUCTS
        : STATIC_PRODUCTS.filter((p) => p.category === activeCategory);

    if (sort === "price-asc") return [...base].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...base].sort((a, b) => b.price - a.price);
    return base;
  }, [activeCategory, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const pageProducts = filtered.slice(start, start + PER_PAGE);

  function handleCategory(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  return (
    <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
      {/* ── Main content ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid #e8e0d4",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.8rem",
              color: "#7a6f66",
            }}
          >
            Showing {start + 1}–{Math.min(start + PER_PAGE, filtered.length)} of{" "}
            {filtered.length} results
          </p>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value as SortKey); setPage(1); }}
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.8rem",
              color: "#5a4a3a",
              border: "1px solid #d4c9b8",
              borderRadius: "3px",
              padding: "0.35rem 0.75rem",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="default">Default sorting</option>
            <option value="price-asc">Sort by price: low to high</option>
            <option value="price-desc">Sort by price: high to low</option>
          </select>
        </div>

        {/* Product grid — 4 columns */}
        {pageProducts.length === 0 ? (
          <p style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "#7a6f66" }}>
            No products found.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.25rem",
            }}
          >
            {pageProducts.map((product) => {
              const name =
                locale === "de" && product.name_de ? product.name_de : product.name_en;
              return (
                <Link
                  key={product.slug}
                  href={`/shop/${product.slug}` as any}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <div
                    className="group"
                    style={{
                      border: "1px solid #e8e0d4",
                      borderRadius: "2px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      transition: "box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 4px 18px rgba(0,0,0,0.1)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")
                    }
                  >
                    {/* Image */}
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "1/1",
                        backgroundColor: "#f7f2ec",
                        overflow: "hidden",
                      }}
                    >
                      {product.thumbnail_url ? (
                        <Image
                          src={product.thumbnail_url}
                          alt={name}
                          fill
                          style={{ objectFit: "contain" }}
                          sizes="(max-width: 768px) 50vw, 220px"
                        />
                      ) : (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#d4c9b8",
                            fontSize: "2.5rem",
                          }}
                        >
                          ◻
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ padding: "0.75rem", textAlign: "center" }}>
                      <p
                        style={{
                          fontFamily: "var(--font-montserrat), sans-serif",
                          fontSize: "0.78rem",
                          color: "#2c2520",
                          marginBottom: "0.25rem",
                          lineHeight: 1.4,
                        }}
                      >
                        {name}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-montserrat), sans-serif",
                          fontSize: "0.8rem",
                          color: "#2c2520",
                          marginBottom: "0.6rem",
                        }}
                      >
                        {formatPrice(product.price)}
                      </p>
                      <button
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "0.45rem 0",
                          backgroundColor: "#fc8855",
                          color: "#fff",
                          border: "none",
                          borderRadius: "2px",
                          fontFamily: "var(--font-montserrat), sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          cursor: "pointer",
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              gap: "0.35rem",
              marginTop: "2.5rem",
              alignItems: "center",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  width: "32px",
                  height: "32px",
                  border: "1px solid",
                  borderColor: p === page ? "#fc8855" : "#d4c9b8",
                  borderRadius: "2px",
                  backgroundColor: p === page ? "#fc8855" : "#fff",
                  color: p === page ? "#fff" : "#5a4a3a",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
            {page < totalPages && (
              <button
                onClick={() => { setPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  padding: "0 0.6rem",
                  height: "32px",
                  border: "1px solid #d4c9b8",
                  borderRadius: "2px",
                  backgroundColor: "#fff",
                  color: "#5a4a3a",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                →
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Sidebar ── */}
      <aside style={{ width: "220px", flexShrink: 0 }}>
        <h3
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "1rem",
            color: "#2c2520",
            fontWeight: 400,
            marginBottom: "0.75rem",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #e8e0d4",
          }}
        >
          Product Categories
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {(CATEGORIES.filter((c) => c !== "All") as string[]).map((cat) => (
            <li key={cat}>
              <button
                onClick={() => handleCategory(cat === activeCategory ? "All" : cat)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0.3rem 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.8rem",
                  color: activeCategory === cat ? "#fc8855" : "#5a4a3a",
                  textAlign: "left",
                  borderBottom: "1px solid #f0ebe3",
                }}
              >
                <span>{cat}</span>
                <span style={{ color: "#a38d51", fontSize: "0.75rem" }}>
                  ({categoryCounts[cat] ?? 0})
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
