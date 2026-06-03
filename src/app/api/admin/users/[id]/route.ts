import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { isAdminAuthed, getAdminUserId } from "@/lib/admin-auth";

export const runtime = "nodejs";

const ROLES = ["admin", "user"];

// Update a user's role
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const me = await getAdminUserId();
  const body = await req.json().catch(() => ({}));
  const role = ROLES.includes(body.role) ? body.role : null;

  if (!role) return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  if (id === me && role !== "admin") {
    return NextResponse.json({ error: "You cannot remove your own admin access" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Backfill email/profile if the row is missing, then set the role.
  const { data: authUser } = await supabase.auth.admin.getUserById(id);
  const { error } = await supabase
    .from("profiles")
    .upsert({ id, email: authUser.user?.email ?? "", role } as any, { onConflict: "id" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// Delete a user
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const me = await getAdminUserId();
  if (id === me) {
    return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.auth.admin.deleteUser(id);
  // profiles row is removed automatically via ON DELETE CASCADE
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
