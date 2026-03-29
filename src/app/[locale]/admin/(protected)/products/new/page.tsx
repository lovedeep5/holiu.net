import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", color: "white", marginBottom: "2rem" }}>
        New Product
      </h1>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(163,141,81,0.1)", borderRadius: "1rem", padding: "2rem" }}>
        <ProductForm />
      </div>
    </div>
  );
}
