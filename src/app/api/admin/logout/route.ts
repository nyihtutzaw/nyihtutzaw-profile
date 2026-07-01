import { ADMIN_COOKIE } from '@/lib/adminAuth';

export async function POST() {
  const cookie = `${ADMIN_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0;`;
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Set-Cookie': cookie },
  });
}
