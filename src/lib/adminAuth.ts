/**
 * Admin session auth.
 *
 * The admin password is stored server-side only (ADMIN_PASSWORD env var) and is
 * never sent to the browser. On successful login we issue an HMAC-signed session
 * token stored in an httpOnly cookie. All helpers use the Web Crypto API so they
 * work in both the Node.js runtime (route handlers) and the Edge runtime
 * (middleware).
 */

export const ADMIN_COOKIE = 'admin_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

/** Secret used to sign session tokens. Falls back to the password so the feature
 *  works with only ADMIN_PASSWORD set, but a dedicated secret is recommended. */
function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
}

function bytesToB64url(bytes: Uint8Array): string {
  let str = '';
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlEncode(text: string): string {
  return bytesToB64url(encoder.encode(text));
}

function b64urlDecode(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  return atob(b64);
}

async function hmac(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return bytesToB64url(new Uint8Array(sig));
}

/** Constant-time string comparison to avoid timing leaks. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Verify a submitted password against ADMIN_PASSWORD (constant-time). */
export function verifyPassword(password: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== 'string' || password.length === 0) return false;
  return timingSafeEqual(password, expected);
}

/** Create a signed session token for an authenticated admin. */
export async function createSessionToken(): Promise<string> {
  const payload = b64urlEncode(JSON.stringify({ role: 'admin', iat: Date.now() }));
  const sig = await hmac(payload, getSecret());
  return `${payload}.${sig}`;
}

/** Validate a session token: signature + role + expiry. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;

  const expected = await hmac(payload, secret);
  if (!timingSafeEqual(sig, expected)) return false;

  try {
    const data = JSON.parse(b64urlDecode(payload)) as { role?: string; iat?: number };
    if (data.role !== 'admin' || typeof data.iat !== 'number') return false;
    if (Date.now() - data.iat > SESSION_MAX_AGE_SECONDS * 1000) return false;
    return true;
  } catch {
    return false;
  }
}
