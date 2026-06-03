"use client";

import { useCallback, useEffect, useState } from "react";

const mont = "var(--font-montserrat), sans-serif";

type User = {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
  last_sign_in_at: string | null;
  isSelf: boolean;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "", role: "user" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/users");
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed to load users");
      setUsers(d.users ?? []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function changeRole(u: User, role: string) {
    if (role === u.role) return;
    setBusyId(u.id);
    setError(null);
    try {
      const r = await fetch(`/api/admin/users/${u.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed to update role");
      setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, role } : x)));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusyId(null);
    }
  }

  async function removeUser(u: User) {
    if (!confirm(`Delete ${u.email}? This permanently removes their account.`)) return;
    setBusyId(u.id);
    setError(null);
    try {
      const r = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed to delete user");
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusyId(null);
    }
  }

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    setError(null);
    try {
      const r = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed to create user");
      setForm({ email: "", password: "", full_name: "", role: "user" });
      setShowAdd(false);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setAdding(false);
    }
  }

  const inp: React.CSSProperties = {
    width: "100%", padding: "0.65rem 0.9rem", borderRadius: "0.5rem",
    border: "1px solid rgba(163,141,81,0.2)", background: "rgba(255,255,255,0.06)",
    color: "white", fontFamily: mont, fontSize: "0.85rem", outline: "none", boxSizing: "border-box",
  };
  const lbl: React.CSSProperties = {
    display: "block", marginBottom: "0.4rem", fontFamily: mont, fontSize: "0.65rem",
    fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a38d51",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", color: "white", margin: 0 }}>Users</h1>
          <p style={{ fontFamily: mont, fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>
            Add or remove users and manage their roles.
          </p>
        </div>
        <button type="button" onClick={() => setShowAdd((v) => !v)}
          style={{ padding: "0.6rem 1.25rem", background: showAdd ? "transparent" : "#fc8855", border: showAdd ? "1px solid rgba(163,141,81,0.3)" : "none", borderRadius: "0.5rem", color: showAdd ? "rgba(255,255,255,0.6)" : "white", fontFamily: mont, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer" }}>
          {showAdd ? "Cancel" : "+ Add User"}
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: "1rem", padding: "0.7rem 1rem", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: "0.5rem", color: "#fca5a5", fontFamily: mont, fontSize: "0.8rem" }}>{error}</div>
      )}

      {/* Add user form */}
      {showAdd && (
        <form onSubmit={addUser} style={{ marginBottom: "1.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(163,141,81,0.12)", borderRadius: "1rem", padding: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={lbl}>Email *</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inp} />
            </div>
            <div>
              <label style={lbl}>Password *</label>
              <input type="text" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={inp} placeholder="min 8 characters" />
            </div>
            <div>
              <label style={lbl}>Full Name</label>
              <input type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} style={inp} />
            </div>
            <div>
              <label style={lbl}>Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={{ ...inp, background: "#1e1810" }}>
                <option value="user" style={{ background: "#1e1810" }}>User</option>
                <option value="admin" style={{ background: "#1e1810" }}>Admin</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={adding}
            style={{ marginTop: "1.25rem", padding: "0.65rem 1.75rem", background: adding ? "rgba(252,136,85,0.4)" : "#fc8855", border: "none", borderRadius: "0.5rem", color: "white", fontFamily: mont, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: adding ? "wait" : "pointer" }}>
            {adding ? "Creating…" : "Create User"}
          </button>
        </form>
      )}

      {/* Users table */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(163,141,81,0.1)", borderRadius: "1rem", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(163,141,81,0.1)" }}>
              {["User", "Role", "Last sign-in", ""].map((h) => (
                <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "left", fontFamily: mont, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ padding: "1.5rem 1rem", fontFamily: mont, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>Loading…</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: "1.5rem 1rem", fontFamily: mont, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>No users found.</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid rgba(163,141,81,0.06)" }}>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <p style={{ fontFamily: mont, fontSize: "0.85rem", color: "white", margin: 0 }}>
                      {u.full_name || u.email}
                      {u.isSelf && <span style={{ marginLeft: "0.5rem", fontSize: "0.6rem", color: "#a38d51", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>You</span>}
                    </p>
                    {u.full_name && <p style={{ fontFamily: mont, fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>{u.email}</p>}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <select value={u.role} disabled={busyId === u.id} onChange={(e) => changeRole(u, e.target.value)}
                      style={{ padding: "0.35rem 0.6rem", borderRadius: "0.4rem", border: "1px solid rgba(163,141,81,0.25)", background: "#1e1810", color: u.role === "admin" ? "#fc8855" : "rgba(255,255,255,0.7)", fontFamily: mont, fontSize: "0.72rem", fontWeight: 700, cursor: busyId === u.id ? "wait" : "pointer", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <option value="user" style={{ background: "#1e1810", color: "white" }}>User</option>
                      <option value="admin" style={{ background: "#1e1810", color: "white" }}>Admin</option>
                    </select>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontFamily: mont, fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
                    {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : "Never"}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", textAlign: "right" }}>
                    <button type="button" disabled={u.isSelf || busyId === u.id} onClick={() => removeUser(u)}
                      title={u.isSelf ? "You can't delete your own account" : "Delete user"}
                      style={{ padding: "0.35rem 0.8rem", border: "1px solid rgba(220,38,38,0.3)", borderRadius: "0.4rem", background: "rgba(220,38,38,0.08)", color: u.isSelf ? "rgba(252,165,165,0.3)" : "#fca5a5", fontFamily: mont, fontSize: "0.7rem", fontWeight: 600, cursor: u.isSelf ? "not-allowed" : "pointer" }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
