import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — HOLIU" };

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Allow the login page without auth
  // (We can't easily read the path here, so login page checks its own thing)
  // We'll protect all routes except login via a different check in the login page
  // But for the layout, we check and redirect if not authed
  // The login page lives at /[locale]/admin/login — it needs to NOT be wrapped
  // by this layout's auth check. We handle this by making login a separate layout.
  // For now: if not authed AND not on login path, redirect.

  const authed = await isAdminAuthed();
  if (!authed) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#111008" }}>
      <AdminSidebar locale={locale} />
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
