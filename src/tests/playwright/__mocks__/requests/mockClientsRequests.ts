import { Page } from "@playwright/test";
import { newClient, updatedClient } from "../datas/mockClients";

export const mockGetClients = async (page: Page, clients: unknown[]) => {
    await page.route(`**/api/clients`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(clients),
        });
    });
}

export const mockPostClient = async (page: Page) => {
    await page.route(`**/api/clients`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: newClient
        });
    });
}

export const mockPutClient = async (page: Page) => {
    await page.route(`**/api/clients/${updatedClient.id}`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: updatedClient
        });
    });
}

export const mockDeleteClient = async (page: Page) => {
    await page.route(`**/api/clients/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json'
        });
    });
}