import { test, expect } from '@playwright/test';
import { mockAuth } from '../__mocks__/mockAuth';
import { mockGetClients, mockPostClient, mockPutClient, mockDeleteClient } from '../__mocks__/mockRequests';
import { clients, clients_after_post, clients_after_put, clients_after_delete } from "../__mocks__/datas/mockClients";

test.describe('Clients', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await mockGetClients(page, clients);

        await page.goto('/clients');
        expect(page.url()).toMatch(/\/clients/);
    });

    test('get clients list', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Clients', level: 1 })).toBeVisible();
        await expect(page.getByText('Alice', { exact: true })).toBeVisible();
        await expect(page.getByText('Bob', { exact: true })).toBeVisible();
    });

    test('filter clients list', async ({ page }) => {
        await page.getByPlaceholder('Filtrer par nom ou prénom', { exact: true }).fill('Bob');

        await expect(page.getByText('Alice', { exact: true })).not.toBeVisible();
        await expect(page.getByText('Bob', { exact: true })).toBeVisible();
    });

    test('create new client', async ({ page }) => {
        await page.locator('#open-client-form-button').first().click();
        await page.getByPlaceholder('Nom *', { exact: true }).fill('Dupont');
        await page.getByPlaceholder('Prénom *', { exact: true }).fill('Jean');
        await page.getByPlaceholder('Email *', { exact: true }).fill('jean.dupont@example.com');
        await page.getByPlaceholder('Entreprise', { exact: true }).fill('TestCorp');

        await mockPostClient(page);
        await mockGetClients(page, clients_after_post);
        await Promise.all([
            page.waitForNavigation({ url: /\/clients/ }),
            page.locator('#open-client-submit-button').click()
        ]);

        expect(page.url()).toMatch(/\/clients/);
        await expect(page.getByText('Dupont', { exact: true })).toBeVisible();
        await expect(page.getByPlaceholder('Nom *')).not.toBeVisible();
    });

    test('cant create new client (bad form)', async ({ page }) => {
        await page.locator('#open-client-form-button').first().click();
        await page.getByPlaceholder('Nom *', { exact: true }).fill('Dupont');
        await page.getByPlaceholder('Email *', { exact: true }).fill('jean.dupont@example.com');
        await page.getByPlaceholder('Entreprise', { exact: true }).fill('TestCorp');

        await expect(page.locator('input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/clients/);
    });

    test('update a client', async ({ page }) => {
        await page.locator("#update-client-form-button").first().click();
        await page.getByPlaceholder("Email").fill("alicedoe@example.com");
        await page.getByPlaceholder("Entreprise").fill("AliD Company");

        await mockPutClient(page);
        await mockGetClients(page, clients_after_put);
        await Promise.all([
            page.waitForNavigation({ url: /\/clients/ }),
            page.locator("#update-client-submit-button").click()
        ]);

        expect(page.url()).toMatch(/\/clients/);
        await expect(page.getByText('alicedoe@example.com', { exact: true })).toBeVisible();
        await expect(page.getByPlaceholder('Entreprise')).not.toBeVisible();
    });

    test('cant update a client (bad form)', async ({ page }) => {
        await page.locator("#update-client-form-button").first().click();
        await page.getByPlaceholder("Email").fill("");
        await page.getByPlaceholder("Entreprise").fill("AliD Company");

        await expect(page.locator('input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/clients/);
    });

    test('delete a client', async ({ page }) => {
        await mockDeleteClient(page);
        await mockGetClients(page, clients_after_delete);
        await page.locator("#Supprimer-button").first().click();
        await page.getByRole("button", { name: "Supprimer" }).click();
        await page.goto('/clients');

        expect(page.url()).toMatch(/\/clients/);
        await expect(page.getByText('Alice')).not.toBeVisible();
        await expect(page.getByText('Bob', { exact: true })).toBeVisible();
    });
});