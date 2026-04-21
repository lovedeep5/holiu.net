import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase/server";

/** Returns true if the current request has a valid admin session */
export async function isAdminAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return false;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    return profile?.role === "admin";
  } catch {
    return false;
  }
}
