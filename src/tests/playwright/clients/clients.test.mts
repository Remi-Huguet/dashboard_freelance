import { test, expect } from '@playwright/test';
import { mockAuth } from '../__mocks__/requests/mockAuth';
import { mockGetClients, mockPostClient, mockPutClient, mockDeleteClient } from '../__mocks__/requests/mockClientsRequests';
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
        await page.locator('#filter-clients-by-name-input').fill('Bob');

        await expect(page.getByText('Alice', { exact: true })).not.toBeVisible();
        await expect(page.getByText('Bob', { exact: true })).toBeVisible();
    });

    test('create new client', async ({ page }) => {
        await page.locator('#open-client-form-button').first().click();
        await page.locator('#create-client-nom-input').fill('Dupont');
        await page.locator('#create-client-prenom-input').fill('Jean');
        await page.locator('#create-client-email-input').fill('jean.dupont@example.com');
        await page.locator('#create-client-company-input').fill('TestCorp');

        await mockPostClient(page);
        await mockGetClients(page, clients_after_post);
        await page.locator('#open-client-submit-button').click();
        await page.goto('/clients');

        expect(page.url()).toMatch(/\/clients/);
        await expect(page.getByText('Dupont', { exact: true })).toBeVisible();
        await expect(page.locator('#create-client-nom-input')).not.toBeVisible();
    });

    test('cant create new client (bad form)', async ({ page }) => {
        await page.locator('#open-client-form-button').first().click();
        await page.locator('#create-client-nom-input').fill('Dupont');
        await page.locator('#create-client-email-input').fill('jean.dupont@example.com');
        await page.locator('#create-client-company-input').fill('TestCorp');

        await expect(page.locator('#create-client-prenom-input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/clients/);
    });

    test('update a client', async ({ page }) => {
        await page.locator("#update-client-form-button").first().click();
        await page.locator('#edit-client-email-input').fill('alicedoe@example.com');
        await page.locator('#edit-client-company-input').fill('AliD Company');

        await mockPutClient(page);
        await mockGetClients(page, clients_after_put);
        await page.locator("#update-client-submit-button").click();
        await page.goto('/clients');

        expect(page.url()).toMatch(/\/clients/);
        await expect(page.getByText('alicedoe@example.com', { exact: true })).toBeVisible();
        await expect(page.getByPlaceholder('Entreprise')).not.toBeVisible();
    });

    test('cant update a client (bad form)', async ({ page }) => {
        await page.locator("#update-client-form-button").first().click();
        await page.locator('#edit-client-email-input').fill('');
        await page.locator('#edit-client-company-input').fill('AliD Company');

        await expect(page.locator('#edit-client-email-input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/clients/);
    });

    test('delete a client', async ({ page }) => {
        await expect(page.locator("#Supprimer-button").first()).toBeEnabled();
        await mockDeleteClient(page);
        await mockGetClients(page, clients_after_delete);
        await page.locator("#Supprimer-button").first().click();
        await page.locator("#Supprimer-confirm-button").click();
        await page.goto('/clients');

        expect(page.url()).toMatch(/\/clients/);
        await expect(page.getByText('Alice')).not.toBeVisible();
        await expect(page.getByText('Bob', { exact: true })).toBeVisible();
    });
});