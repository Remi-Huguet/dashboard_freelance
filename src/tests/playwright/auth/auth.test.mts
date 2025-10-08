import { test, expect } from '@playwright/test';
import { fakeAuth } from '../__mocks__/fakeAuth';

test('AUTH [SUCCESS CASE] redirect to /auth if not logged in', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  expect(page.url()).toContain('/auth');
});

test('AUTH [SUCCESS CASE] redirect to /dashboard if logged in', async ({ page, context }) => {
  await fakeAuth(page, context);
  await page.goto('/');
  await page.waitForURL(/\/dashboard/, { timeout: 15000 });

  expect(page.url()).toMatch(/\/dashboard/);
});