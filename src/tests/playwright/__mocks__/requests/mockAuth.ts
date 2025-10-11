import { BrowserContext, Page } from "@playwright/test";
import dotenv from 'dotenv';

dotenv.config();

export const mockAuth = async (page: Page, context: BrowserContext) => {
    const r = await page.request.post(`${process.env.PLAYWRIGHT_TEST_URL}/api/test-auth`);
    const data = await r.json();

    if (!data.cookieValue) throw new Error('Cookie not set by test-login');

    await context.addCookies([{
        name: 'next-auth.session-token',
        value: data.cookieValue,
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        sameSite: 'Lax',
    }]);
}

export const mockLogout = async (page: Page) => {
    await page.route('**/api/auth/signout', (route) => {
        route.fulfill({ status: 200, body: '{}' });
    });
}