import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

function makeSupabase(req: NextRequest, res: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );
}

/** POST — login or signup */
export async function POST(req: NextRequest) {
  const { mode, email, password, first_name, last_name, name } = await req.json();

  const response = NextResponse.json({ ok: true });
  const supabase = makeSupabase(req, response);

  if (mode === "signup") {
    // Back-compat: accept legacy "name" field
    const parts = name ? String(name).trim().split(/\s+/) : [];
    const fName = first_name ?? parts[0] ?? "";
    const lName = last_name ?? (parts.length > 1 ? parts.slice(1).join(" ") : "");
    const fullName = [fName, lName].filter(Boolean).join(" ");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: fName,
          last_name: lName,
          name: fullName,
        },
      },
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({
      ok: true,
      message: "Check your email to confirm your account.",
    });
  }

  // login
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return response;
}

/** DELETE — logout */
export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const supabase = makeSupabase(req, response);
  await supabase.auth.signOut();
  return response;
}
