"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV = [
  { href: "/en/admin", label: "Dashboard", icon: "⊞" },
  { href: "/en/admin/products", label: "Products", icon: "◈" },
  { href: "/en/admin/orders", label: "Orders", icon: "◉" },
  { href: "/en/admin/leads", label: "Leads", icon: "◎" },
];

export default function AdminSidebar({ locale }: { locale: string }) {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = `/${locale}/admin/login`;
  }

  return (
    <aside style={{
      width: "220px",
      minWidth: "220px",
      background: "rgba(255,255,255,0.03)",
      borderRight: "1px solid rgba(163,141,81,0.12)",
      display: "flex",
      flexDirection: "column",
      padding: "1.5rem 0",
    }}>
      {/* Logo */}
      <div style={{ padding: "0 1.5rem 1.5rem", borderBottom: "1px solid rgba(163,141,81,0.1)" }}>
        <p style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#a38d51",
        }}>HOLIU</p>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.5)",
          marginTop: "0.15rem",
        }}>Admin</p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1rem 0" }}>
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== "/en/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.5rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.8rem",
                fontWeight: active ? 700 : 500,
                color: active ? "#fc8855" : "rgba(255,255,255,0.5)",
                background: active ? "rgba(252,136,85,0.08)" : "transparent",
                borderLeft: active ? "2px solid #fc8855" : "2px solid transparent",
                textDecoration: "none",
                transition: "all 0.15s",
                letterSpacing: "0.05em",
              }}
            >
              <span style={{ fontSize: "0.85rem" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(163,141,81,0.1)" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "0.6rem",
            background: "transparent",
            border: "1px solid rgba(163,141,81,0.2)",
            borderRadius: "0.5rem",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
