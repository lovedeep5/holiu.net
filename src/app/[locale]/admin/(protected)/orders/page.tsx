import { createServiceClient } from "@/lib/supabase/server";

export default async function AdminOrdersPage() {
  const supabase = createServiceClient();
  const { data: orders } = await supabase
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
        products ( name_en )
      )
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", color: "white", marginBottom: "2rem" }}>Orders</h1>

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(163,141,81,0.1)", borderRadius: "1rem", overflow: "hidden" }}>
        {!orders?.length ? (
          <p style={{ padding: "2rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.3)" }}>
            No orders yet
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(163,141,81,0.1)" }}>
                {["Email", "Products", "Amount", "Status", "Date"].map((h) => (
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
              {(orders as any[]).map((o) => {
                const items = o.order_items ?? [];
                const total = items.reduce((sum: number, i: any) => sum + (i.price_paid ?? 0), 0);
                return (
                  <tr key={o.id} style={{ borderBottom: "1px solid rgba(163,141,81,0.06)" }}>
                    <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.82rem", color: "white" }}>
                      {o.customer_email}
                    </td>
                    <td style={{ padding: "0.875rem 1rem" }}>
                      {items.map((i: any) => (
                        <p key={i.id} style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                          {i.products?.name_en ?? "—"}
                        </p>
                      ))}
                    </td>
                    <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.82rem", color: "#a38d51", fontWeight: 600 }}>
                      €{(total / 100).toFixed(2)}
                    </td>
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <span style={{
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        fontSize: "0.65rem",
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        background: o.status === "paid" ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
                        color: o.status === "paid" ? "#86efac" : "rgba(255,255,255,0.4)",
                      }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
                      {new Date(o.created_at).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
