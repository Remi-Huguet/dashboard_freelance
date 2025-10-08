import { NextResponse } from 'next/server';

export async function POST() {
  if (process.env.PLAYWRIGHT_ENABLE_TEST_LOGIN !== 'true') {
    return NextResponse.json({ error: 'Not enabled' }, { status: 404 });
  }

  const session = {
    user: {
      name: 'Playwright Test User',
      email: 'test@example.com',
      image: 'https://example.com/avatar.png',
    },
    expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  };

  const { encode } = await import('next-auth/jwt');
  const token = await encode({ token: session, secret: process.env.NEXTAUTH_SECRET || 'http://localhost:3000' });

  const cookieName = 'next-auth.session-token';
  const cookie = `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60}`;

  return NextResponse.json({ ok: true, cookieValue: token }, {
    status: 200,
    headers: { 'Set-Cookie': cookie },
  });
}
