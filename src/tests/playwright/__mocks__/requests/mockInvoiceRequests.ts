import { Page } from "@playwright/test";
import { newInvoice, updatedInvoice } from "../datas/mockInvoice";

export const mockGetInvoiceByProject = async (page: Page, invoice: unknown) => {
    await page.route(`**/api/projects/1/invoice`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: invoice
        });
    });
}

export const mockPostInvoice = async (page: Page) => {
    await page.route(`**/api/invoices`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(newInvoice)
        });
    });
}

export const mockPutInvoice = async (page: Page) => {
    await page.route(`**/api/invoices/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(updatedInvoice)
        });
    });
}