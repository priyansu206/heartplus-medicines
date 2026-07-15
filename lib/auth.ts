import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

// Simple HMAC token using Web Crypto API (Edge-compatible)
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

export async function createSession(secret: string): Promise<string> {
  const timestamp = Date.now().toString();
  const signature = await hmacSign(secret, timestamp);
  return `${timestamp}.${signature}`;
}

export async function verifySession(
  secret: string,
  token: string
): Promise<boolean> {
  const [timestamp, signature] = token.split(".");
  if (!timestamp || !signature) return false;

  // Reject if older than max age
  const age = (Date.now() - Number(timestamp)) / 1000;
  if (age > SESSION_MAX_AGE || age < 0) return false;

  const expected = await hmacSign(secret, timestamp);
  return signature === expected;
}

export function setSessionCookie(
  response: NextResponse,
  token: string
): NextResponse {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}

export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export function getSessionFromRequest(
  request: NextRequest
): string | undefined {
  return request.cookies.get(SESSION_COOKIE)?.value;
}

// --- Rate Limiter (in-memory, per-IP) ---

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) rateLimitStore.delete(key);
  }
}, 5 * 60 * 1000);

export function checkRateLimit(
  ip: string,
  maxAttempts = 5,
  windowMs = 60_000
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1, retryAfterMs: 0 };
  }

  entry.count++;

  if (entry.count > maxAttempts) {
    const retryAfterMs = entry.resetAt - now;
    return { allowed: false, remaining: 0, retryAfterMs };
  }

  return {
    allowed: true,
    remaining: maxAttempts - entry.count,
    retryAfterMs: 0,
  };
}
