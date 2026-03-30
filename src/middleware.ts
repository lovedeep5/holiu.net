import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Extract locale + path-without-locale
  // e.g. /en/admin/products → locale="en", sub="/admin/products"
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
  const locale = localeMatch?.[1] ?? "en";
  const sub = localeMatch?.[2] ?? "/";

  // ── Admin protection ────────────────────────────────────────────
  const isAdminRoute = /^\/admin(\/|$)/.test(sub);
  const isAdminLogin = sub === "/admin/login" || sub.startsWith("/admin/login/");

  if (isAdminRoute && !isAdminLogin) {
    const token = req.cookies.get("admin_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, req.url));
    }
  }

  // ── Account protection ──────────────────────────────────────────
  const isAccountRoute = /^\/account(\/|$)/.test(sub);
  const isAccountLogin = sub === "/account/login" || sub.startsWith("/account/login/");

  if (isAccountRoute && !isAccountLogin) {
    const supabaseRes = NextResponse.next({ request: req });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return req.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              req.cookies.set(name, value);
              supabaseRes.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL(`/${locale}/account/login`, req.url));
    }

    // Session valid — run intl and carry over any refreshed Supabase cookies
    const intlRes = intlMiddleware(req);
    supabaseRes.cookies.getAll().forEach((c) => {
      intlRes.cookies.set(c.name, c.value);
    });
    return intlRes;
  }

  // ── All other routes — just run intl ────────────────────────────
  const res = intlMiddleware(req);

  // Mark admin routes so the root layout can hide Navbar/Footer
  if (isAdminRoute) {
    res.headers.set("x-is-admin", "1");
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)",
  ],
};
