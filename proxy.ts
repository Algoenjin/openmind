import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, gateToken } from "./app/lib/gate";

export async function proxy(request: NextRequest) {
  const expected = await gateToken();
  const cookie = request.cookies.get(GATE_COOKIE)?.value;
  if (expected && cookie === expected) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;
  url.pathname = "/unlock";
  url.search = "";
  if (pathname !== "/") url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // Lock everything except the unlock page itself, Next.js internals,
  // metadata files browsers request unconditionally, and public image
  // assets — the image optimizer refetches those server-side without the
  // gate cookie, so gating them breaks every <Image> thumbnail.
  matcher: [
    "/((?!unlock|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\.png$|.*\\.svg$).*)",
  ],
};
