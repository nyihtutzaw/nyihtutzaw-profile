import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/adminAuth';

/**
 * Protects the admin area. Unauthenticated requests to /admin/* are redirected
 * to the login page; unauthenticated requests to protected admin APIs get 401.
 * The login page and login/logout APIs are always public.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public admin endpoints.
  if (
    pathname === '/admin/login' ||
    pathname === '/api/admin/login' ||
    pathname === '/api/admin/logout'
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const authed = await verifySessionToken(token);
  if (authed) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.search = '';
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
