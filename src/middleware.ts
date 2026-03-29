import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const res = intlMiddleware(req);

  // Tag admin routes so the locale layout can skip Navbar/Footer
  const pathname = req.nextUrl.pathname;
  if (/\/admin(\/|$)/.test(pathname)) {
    (res as NextResponse).headers.set("x-is-admin", "1");
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)",
  ],
};
