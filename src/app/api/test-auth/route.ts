import { NextResponse } from 'next/server';

export async function POST() {
  if (process.env.PLAYWRIGHT_ENABLE_TEST_LOGIN !== 'true') {
    return NextResponse.json({ error: 'Not enabled' }, { status: 404 });
  }

  const payload = {
    name: 'Playwright Test User',
    email: 'test@example.com',
    picture: 'https://example.com/avatar.png',
    sub: 'playwright-test-user-id',
  };

  const { encode } = await import('next-auth/jwt');
  const token = await encode({ token: payload, secret: process.env.NEXTAUTH_SECRET || 'http://localhost:3000' });

  const cookieName = 'next-auth.session-token';
  const cookie = `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60}`;

  return NextResponse.json({ ok: true, cookieValue: token }, {
    status: 200,
    headers: { 'Set-Cookie': cookie },
  });
}
