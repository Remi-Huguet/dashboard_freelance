import { Page } from "@playwright/test";
import { new_link, updated_link } from "../datas/mockLinks";

export const mockGetLinksByProject = async (page: Page, links: unknown[]) => {
    await page.route(`**/api/projects/1/links`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(links),
        });
    });
}

export const mockPostLink = async (page: Page) => {
    await page.route(`**/api/links`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: JSON.stringify(new_link),
        });
    });
}

export const mockPutLink = async (page: Page) => {
    await page.route(`**/api/links/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: JSON.stringify(updated_link),
        });
    });
}

export const mockDeleteLink = async (page: Page) => {
    await page.route(`**/api/links/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json'
        });
    });
}