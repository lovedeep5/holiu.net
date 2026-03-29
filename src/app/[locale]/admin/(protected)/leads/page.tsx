import { createServiceClient } from "@/lib/supabase/server";

export default async function AdminLeadsPage() {
  const supabase = createServiceClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", color: "white", marginBottom: "2rem" }}>Leads</h1>

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(163,141,81,0.1)", borderRadius: "1rem", overflow: "hidden" }}>
        {!leads?.length ? (
          <p style={{ padding: "2rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.3)" }}>
            No leads yet
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(163,141,81,0.1)" }}>
                {["Name", "Email", "Source", "Message", "Date"].map((h) => (
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
              {(leads as any[]).map((l) => (
                <tr key={l.id} style={{ borderBottom: "1px solid rgba(163,141,81,0.06)" }}>
                  <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.82rem", color: "white" }}>
                    {l.name || "—"}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.82rem", color: "#a38d51" }}>
                    {l.email}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span style={{
                      padding: "0.2rem 0.6rem",
                      borderRadius: "999px",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      background: "rgba(163,141,81,0.15)",
                      color: "#a38d51",
                    }}>
                      {l.source ?? "contact"}
                    </span>
                  </td>
                  <td style={{
                    padding: "0.875rem 1rem",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.45)",
                    maxWidth: "300px",
                  }}>
                    <p style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}>
                      {l.message || "—"}
                    </p>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>
                    {new Date(l.created_at).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
