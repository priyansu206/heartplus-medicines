import { NextRequest, NextResponse } from "next/server";
import { createSession, setSessionCookie, checkRateLimit } from "@/lib/auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit: 5 attempts per minute per IP
  const { allowed, remaining, retryAfterMs } = checkRateLimit(ip, 5, 60_000);

  if (!allowed) {
    return NextResponse.json(
      {
        error: `Too many attempts. Try again in ${Math.ceil(retryAfterMs / 1000)}s.`,
        remaining: 0,
      },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Invalid password.", remaining },
      { status: 401 }
    );
  }

  const secret = process.env.SESSION_SECRET || ADMIN_PASSWORD!;
  const token = await createSession(secret);
  const response = NextResponse.json({ success: true, remaining });
  return setSessionCookie(response, token);
}
