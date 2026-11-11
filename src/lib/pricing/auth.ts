import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const PRICING_SESSION_COOKIE = "melhek_pricing_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

export function isPricingAuthConfigured(): boolean {
  const accessKey = process.env.PRICING_ACCESS_KEY;
  const sessionSecret = process.env.PRICING_SESSION_SECRET;

  return Boolean(accessKey && accessKey.length >= 16 && sessionSecret && sessionSecret.length >= 32);
}

function getSessionSecret(): string | null {
  if (!isPricingAuthConfigured()) return null;
  return process.env.PRICING_SESSION_SECRET ?? null;
}

function safeStringEqual(left: string, right: string): boolean {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

export function isValidPricingAccessKey(candidate: string): boolean {
  const configuredKey = process.env.PRICING_ACCESS_KEY;
  if (!isPricingAuthConfigured() || !configuredKey) return false;
  return safeStringEqual(candidate, configuredKey);
}

function signatureFor(expiry: string, secret: string): string {
  return createHmac("sha256", secret).update(expiry).digest("base64url");
}

export function createPricingSession(): { value: string; maxAge: number } | null {
  const secret = getSessionSecret();
  if (!secret) return null;

  const expiry = String(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS);
  return {
    value: `${expiry}.${signatureFor(expiry, secret)}`,
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function isValidPricingSession(value?: string | null): boolean {
  const secret = getSessionSecret();
  if (!secret || !value) return false;

  const [expiry, providedSignature, extra] = value.split(".");
  if (!expiry || !providedSignature || extra !== undefined) return false;

  const expirySeconds = Number(expiry);
  if (!Number.isSafeInteger(expirySeconds) || expirySeconds <= Math.floor(Date.now() / 1000)) return false;

  return safeStringEqual(providedSignature, signatureFor(expiry, secret));
}

export function hasPricingSessionInCookieHeader(cookieHeader?: string | null): boolean {
  const session = cookieHeader
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${PRICING_SESSION_COOKIE}=`))
    ?.slice(PRICING_SESSION_COOKIE.length + 1);

  if (!session || session.length > 256) return false;
  try {
    return isValidPricingSession(decodeURIComponent(session));
  } catch {
    return false;
  }
}

export async function hasPricingAccess(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidPricingSession(cookieStore.get(PRICING_SESSION_COOKIE)?.value);
}

export const PRIVATE_RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};
