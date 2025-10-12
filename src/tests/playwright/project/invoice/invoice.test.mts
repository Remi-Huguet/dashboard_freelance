import { test, expect } from '@playwright/test';
import { mockAuth } from '../../__mocks__/requests/mockAuth';
import { mockGetProjects, mockGetProject } from '../../__mocks__/requests/mockProjectsRequests';
import { projects, project } from "../../__mocks__/datas/mockProjects";
import { mockGetInvoiceByProject, mockPostInvoice, mockPutInvoice } from '../../__mocks__/requests/mockInvoiceRequests';
import { invoice, newInvoice, updatedInvoice } from "../../__mocks__/datas/mockInvoice";

test.describe('LINKS', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await mockGetProjects(page, false, projects);
        await page.goto('/projects');

        expect(page.url()).toMatch(/\/projects/);

        await mockGetProject(page, project);
        await page.locator('#project-link-button').first().click();

        expect(page.url()).toMatch(/\/projects\/\d+/);
        await expect(page.locator('#project-config-button')).toBeVisible();
    });

    test('get invoice', async ({ page }) => {
        await mockGetInvoiceByProject(page, invoice);
        await page.locator('#invoice-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/invoice/);

        await expect(page.getByRole('heading', { name: 'Facturation', level: 1 })).toBeVisible();
        await expect(page.getByText('350')).toBeVisible();
        await expect(page.getByText('Par jour')).toBeVisible();
    });

    test('go back to project', async ({ page }) => {
        await mockGetInvoiceByProject(page, invoice);
        await page.locator('#invoice-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/invoice/);

        await expect(page.getByRole('heading', { name: 'Facturation', level: 1 })).toBeVisible();
        await page.locator('#back-to-project-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+/);
    });

    test('create an invoice', async ({ page }) => {
        await page.locator('#invoice-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/invoice/);

        await page.waitForTimeout(3000);
        await page.locator('#create-invoice-form-button').click();
        await page.locator("#create-invoice-princing-value-input").fill("450");
        await page.locator("#create-invoice-princing-type-select").selectOption("Par jour");

        await mockPostInvoice(page);
        await mockGetInvoiceByProject(page, newInvoice);
        await page.locator('#create-invoice-submit-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/invoice/);
        await expect(page.getByText('450')).toBeVisible();
        await expect(page.getByText('Par jour')).toBeVisible();
        await expect(page.locator('#create-invoice-princing-value-input')).not.toBeVisible();
    });

    test('cant create an invoice (bad form)', async ({ page }) => {
        await page.locator('#invoice-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/invoice/);

        await page.waitForTimeout(3000);
        await page.locator('#create-invoice-form-button').click();
        await page.locator("#create-invoice-princing-value-input").fill("450");

        await mockPostInvoice(page);
        await mockGetInvoiceByProject(page, newInvoice);
        await page.locator('#create-invoice-submit-button').click();

        await expect(page.locator('#create-invoice-princing-type-select:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/projects\/\d+\/invoice/);
    });

    test('update invoice', async ({ page }) => {
        await mockGetInvoiceByProject(page, invoice);
        await page.locator('#invoice-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/invoice/);

        await expect(page.getByText('350')).toBeVisible();
        await expect(page.getByText('Par jour')).toBeVisible();
        await page.locator('#edit-invoice-form-button').click();
        await page.locator("#edit-invoice-princing-value-input").fill("5000");
        await page.locator("#edit-invoice-princing-type-select").selectOption("Pour la mission");

        await mockPutInvoice(page);
        await mockGetInvoiceByProject(page, updatedInvoice);
        page.locator('#edit-invoice-submit-button').click();

        await expect(page.getByText('5000')).toBeVisible();
        await expect(page.getByText('Pour la mission')).toBeVisible();
        await expect(page.locator('#edit-invoice-princing-value-input')).not.toBeVisible();
    });
});