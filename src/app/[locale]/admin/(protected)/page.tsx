import { createServiceClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = createServiceClient();

  const [
    { count: productCount },
    { count: orderCount },
    { count: leadCount },
    { data: recentOrders },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "paid" as any),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("id, customer_email, status, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("leads").select("id, name, email, source, created_at").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Products", value: productCount ?? 0, color: "#fc8855" },
    { label: "Paid Orders", value: orderCount ?? 0, color: "#a38d51" },
    { label: "Leads", value: leadCount ?? 0, color: "#7a6f66" },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", color: "white", marginBottom: "0.5rem" }}>
        Dashboard
      </h1>
      <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "2.5rem" }}>
        Welcome back, Ruth
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4" style={{ marginBottom: "3rem" }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(163,141,81,0.1)",
            borderRadius: "1rem",
            padding: "1.5rem",
          }}>
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>
              {s.label}
            </p>
            <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2.5rem", color: s.color, lineHeight: 1 }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(163,141,81,0.1)", borderRadius: "1rem", padding: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem", color: "white", marginBottom: "1rem" }}>Recent Orders</h2>
          {!recentOrders?.length ? (
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>No orders yet</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {recentOrders.map((o: any) => (
                <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "white" }}>{o.customer_email}</p>
                    <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
                      {new Date(o.created_at).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <span style={{
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    background: o.status === "paid" ? "rgba(34,197,94,0.15)" : "rgba(252,136,85,0.15)",
                    color: o.status === "paid" ? "#86efac" : "#fc8855",
                  }}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Leads */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(163,141,81,0.1)", borderRadius: "1rem", padding: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem", color: "white", marginBottom: "1rem" }}>Recent Leads</h2>
          {!recentLeads?.length ? (
            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>No leads yet</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {recentLeads.map((l: any) => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.8rem", color: "white" }}>{l.email}</p>
                    <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
                      {l.source} · {new Date(l.created_at).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
