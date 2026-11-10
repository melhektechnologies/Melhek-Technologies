import { NextResponse } from "next/server";
import {
  createPricingSession,
  isPricingAuthConfigured,
  isValidPricingAccessKey,
  hasPricingSessionInCookieHeader,
  PRIVATE_RESPONSE_HEADERS,
  PRICING_SESSION_COOKIE,
} from "@/lib/pricing/auth";

const attemptsByAddress = new Map<string, { count: number; windowEndsAt: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 8;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

function addressKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "unknown";
}

function reply(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: PRIVATE_RESPONSE_HEADERS });
}

export async function GET(request: Request) {
  const authorized = hasPricingSessionInCookieHeader(request.headers.get("cookie"));
  return reply({ authorized }, authorized ? 200 : 401);
}

export async function POST(request: Request) {
  if (!isPricingAuthConfigured()) {
    return reply({ error: "Pricing access is not configured on the server." }, 503);
  }

  const key = addressKey(request);
  const now = Date.now();
  let attemptState = attemptsByAddress.get(key);

  if (attemptState?.lockedUntil && attemptState.lockedUntil > now) {
    return reply({ error: "Too many attempts. Try again later." }, 429);
  }
  if (!attemptState || attemptState.windowEndsAt <= now || attemptState.lockedUntil <= now) {
    attemptState = { count: 0, windowEndsAt: now + ATTEMPT_WINDOW_MS, lockedUntil: 0 };
  }

  let candidate = "";
  try {
    const body: unknown = await request.json();
    if (body && typeof body === "object" && "accessKey" in body && typeof body.accessKey === "string") {
      candidate = body.accessKey;
    }
  } catch {
    return reply({ error: "Invalid request." }, 400);
  }

  if (!isValidPricingAccessKey(candidate)) {
    attemptState.count += 1;
    if (attemptState.count >= MAX_ATTEMPTS) {
      attemptState.lockedUntil = now + ATTEMPT_WINDOW_MS;
    }
    attemptsByAddress.set(key, attemptState);
    return reply({ error: "The access key was not accepted." }, attemptState.lockedUntil ? 429 : 401);
  }

  attemptsByAddress.delete(key);
  const session = createPricingSession();
  if (!session) return reply({ error: "Pricing access is not configured on the server." }, 503);

  const response = reply({ success: true });
  response.cookies.set(PRICING_SESSION_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: session.maxAge,
  });
  return response;
}

export async function DELETE() {
  const response = reply({ success: true });
  response.cookies.set(PRICING_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
