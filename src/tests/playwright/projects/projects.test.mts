import { test, expect } from '@playwright/test';
import { mockAuth } from '../__mocks__/mockAuth';
import { mockGetProjects, mockPostProject, mockGetClients } from '../__mocks__/mockRequests';
import { projects, projects_after_post } from "../__mocks__/datas/mockProjects";
import { clients } from "../__mocks__/datas/mockClients";

test.describe('PROJETS', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await mockGetProjects(page, false, projects);

        await page.goto('/projects');
    });

    test('get projects list', async ({ page }) => {
        expect(page.url()).toMatch(/\/projects/);

        await expect(page.getByRole('heading', { name: 'Projets', level: 1 })).toBeVisible();
        await expect(page.getByText('Projet Alpha')).toBeVisible();
        await expect(page.getByText('Projet Beta')).toBeVisible();
    });

    test('filter projects list', async ({ page }) => {
        expect(page.url()).toMatch(/\/projects/);

        await page.getByPlaceholder('Filtrer par nom', { exact: true }).fill('Beta');

        await expect(page.getByText('Projet Alpha')).not.toBeVisible();
        await expect(page.getByText('Projet Beta')).toBeVisible();
    });

    test('go to a project detail', async ({ page }) => {
        expect(page.url()).toMatch(/\/projects/);

        await page.locator('#project-link-button').first().click();
        await expect(page).toHaveURL(/\/projects\/\d+/);
    });

    test('create new project', async ({ page }) => {
        await mockGetClients(page, clients);
        expect(page.url()).toMatch(/\/projects/);

        await page.locator('#open-project-form-button').first().click();
        await page.getByPlaceholder('Nom *', { exact: true }).fill('Projet Ceta');
        await page.locator('select').filter({ hasText: 'Sélectionner un statut *' }).selectOption('Terminé');
        await page.locator('select').filter({ hasText: 'Sélectionner un client *' }).selectOption({ label: 'Alice Doe' }); 

        await mockPostProject(page);
        await mockGetProjects(page, false, projects_after_post);
        await Promise.all([
            page.waitForNavigation({ url: /\/projects/ }),
            page.getByRole('button', { name: 'Créer' }).click(),
        ]);

        expect(page.url()).toMatch(/\/projects/);
        await expect(page.getByText('Projet Ceta',)).toBeVisible();
        await expect(page.getByPlaceholder('Nom *')).not.toBeVisible();
    });

    test('cant create new project (bad form)', async ({ page }) => {
        await mockGetClients(page, clients);
        expect(page.url()).toMatch(/\/projects/);

        await page.locator('#open-project-form-button').first().click();
        await page.locator('select').filter({ hasText: 'Sélectionner un statut *' }).selectOption('Terminé');
        await page.locator('select').filter({ hasText: 'Sélectionner un client *' }).selectOption({ label: 'Alice Doe' }); 

        await expect(page.locator('input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/projects/);
    });
});
    