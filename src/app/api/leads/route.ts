import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, message, source = "contact" } = body;

    // Back-compat: accept "name" if first_name/last_name not provided
    const fallbackName: string | undefined = body.name;
    const parts = fallbackName ? fallbackName.trim().split(/\s+/) : [];
    const fName = first_name ?? parts[0] ?? null;
    const lName = last_name ?? (parts.length > 1 ? parts.slice(1).join(" ") : null);

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const fullName = [fName, lName].filter(Boolean).join(" ") || null;

    const supabase = createServiceClient();
    const { error } = await supabase
      .from("leads")
      .insert({
        name: fullName,
        first_name: fName,
        last_name: lName,
        email,
        message,
        source,
      } as any);

    if (error) {
      console.error("[leads]", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
