import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { isAdminAuthed, getAdminUserId } from "@/lib/admin-auth";
import { validatePassword } from "@/lib/password";

export const runtime = "nodejs";

const ROLES = ["admin", "user"];

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const me = await getAdminUserId();

  const { data: list, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: profiles } = await supabase.from("profiles").select("id, role, full_name");
  const roleById = new Map((profiles ?? []).map((p) => [p.id, p]));

  const users = list.users.map((u) => {
    const p = roleById.get(u.id);
    return {
      id: u.id,
      email: u.email ?? "",
      full_name: p?.full_name ?? (u.user_metadata?.full_name as string | undefined) ?? null,
      role: p?.role ?? "user",
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
      isSelf: u.id === me,
    };
  });

  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const full_name = body.full_name ? String(body.full_name).trim() : null;
  const role = ROLES.includes(body.role) ? body.role : "user";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }
  const pw = validatePassword(password);
  if (!pw.valid) {
    return NextResponse.json({ error: pw.error }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: full_name ? { full_name } : undefined,
  });
  if (error || !data.user) {
    return NextResponse.json({ error: error?.message ?? "Failed to create user" }, { status: 400 });
  }

  // Ensure a matching profile row with the chosen role (service role bypasses RLS).
  const { error: pErr } = await supabase
    .from("profiles")
    .upsert({ id: data.user.id, email, full_name, role } as any, { onConflict: "id" });
  if (pErr) {
    return NextResponse.json({ error: `User created but profile failed: ${pErr.message}` }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.user.id }, { status: 201 });
}
