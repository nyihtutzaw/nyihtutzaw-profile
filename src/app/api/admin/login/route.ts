import { ADMIN_COOKIE, SESSION_MAX_AGE_SECONDS, createSessionToken, verifyPassword } from '@/lib/adminAuth';

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return Response.json(
      { error: 'Admin login is not configured. Set ADMIN_PASSWORD.' },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!verifyPassword(body.password)) {
    return Response.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const token = await createSessionToken();
  const secure = process.env.NODE_ENV === 'production' ? ' Secure;' : '';
  const cookie = `${ADMIN_COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS};${secure}`;

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Set-Cookie': cookie },
  });
}
