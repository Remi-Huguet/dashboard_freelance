import { test, expect } from '@playwright/test';
import { mockAuth } from '../__mocks__/mockAuth';

test.describe('NAVIGATION', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await page.goto('/dashboard');
    });

    test('go to dashboard via logo link', async ({ page }) => {
        await page.waitForSelector('a[href="/dashboard"]');
        await Promise.all([
            page.waitForURL(/\/dashboard$/),
            page.getByRole('link', { name: /Dashboard Freelance$/ }).click(),
        ]);

        expect(page.url()).toMatch(/\/dashboard/);
    });

    test('go to dashboard via dashboard nav link', async ({ page }) => {
        await page.waitForSelector('a[href="/dashboard"]');
        await Promise.all([
            page.waitForURL(/\/dashboard$/),
            page.getByRole('link', { name: /Dashboard$/ }).click(),
        ]);

        expect(page.url()).toMatch(/\/dashboard/);
    });

    test('go to projects via projets nav link', async ({ page }) => {
        await page.waitForSelector('a[href="/projects"]');
        await Promise.all([
            page.waitForURL(/\/projects$/),
            page.getByRole('link', { name: /Projets$/ }).click(),
        ]);

        expect(page.url()).toMatch(/\/projects/);
    });

    test('go to clients via clients nav link', async ({ page }) => {
        await page.waitForSelector('a[href="/clients"]');
        await Promise.all([
            page.waitForURL(/\/clients$/),
            page.getByRole('link', { name: /Clients$/ }).click(),
        ]);

        expect(page.url()).toMatch(/\/clients/);
    });

    test('go to /auth via logout button', async ({ page }) => {
        await page.locator("#Déconnexion-button").click();
        await Promise.all([
          page.waitForURL(/\/auth$/),
          page.getByRole('button', { name: 'Déconnexion' }).click(),
        ]);

        await expect(page).toHaveURL(/\/auth$/);
    });
});
