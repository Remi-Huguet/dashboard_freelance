import { test, expect } from '@playwright/test';
import { mockAuth } from '../__mocks__/requests/mockAuth';

test.describe('AUTH', () => {

  test('redirect to /auth if not logged in', async ({ page }) => {
    await page.goto('/');

    expect(page.url()).toMatch(/\/auth/);
  });

  test('redirect to /dashboard if logged in', async ({ page, context }) => {
    await mockAuth(page, context);
    await page.goto('/');

    expect(page.url()).toMatch(/\/dashboard/);
  });
});