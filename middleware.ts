import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";

async function hmacSign(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verifySession(secret: string, token: string): Promise<boolean> {
  const [timestamp, signature] = token.split(".");
  if (!timestamp || !signature) return false;
  const age = (Date.now() - Number(timestamp)) / 1000;
  if (age > 60 * 60 * 8 || age < 0) return false;
  const expected = await hmacSign(secret, timestamp);
  return signature === expected;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/dashboard and other admin sub-routes, but NOT /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const secret = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "";

    if (!token || !(await verifySession(secret, token))) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
