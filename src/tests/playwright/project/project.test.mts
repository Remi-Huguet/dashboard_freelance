import { test, expect } from '@playwright/test';
import { mockAuth } from '../__mocks__/mockAuth';
import { mockGetProjects, mockGetProject, mockDeleteProject, mockGetClients, mockPutProject } from '../__mocks__/mockRequests';
import { project, projects, projects_after_delete, updatedProject } from "../__mocks__/datas/mockProjects";
import { clients } from "../__mocks__/datas/mockClients";


test.describe('PROJET', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await mockGetProjects(page, false, projects);

        await page.goto('/projects');
        await mockGetProject(page, project);
        await page.locator('#project-link-button').first().click();
    });

    test('get project', async ({ page }) => {
        await expect(page).toHaveURL(/\/projects\/\d+/);

        await expect(page.getByRole('heading', { name: 'Projet : Projet Alpha', level: 1 })).toBeVisible();
        await expect(page.getByText('Statut : En cours')).toBeVisible();
    });

    test('back to project', async ({ page }) => {
        await expect(page).toHaveURL(/\/projects\/\d+/);

        await mockGetProject(page, project);
        await page.locator('#project-config-button').click();
        await expect(page).toHaveURL(/\/projects\/\d+\/config/);

        await page.locator('#back-to-project-button').click();
        await expect(page).toHaveURL(/\/projects\/\d+/);
    });

    test('update a project', async ({ page }) => {
        await expect(page).toHaveURL(/\/projects\/\d+/);
        
        await mockGetProject(page, project);
        await page.locator('#project-config-button').click();

        await expect(page).toHaveURL(/\/projects\/\d+\/config/);
        await expect(page.locator("#update-project-button")).toBeVisible({ timeout: 10000 });
        await page.locator("#update-project-button").click();
        await page.locator("#select-status-project").selectOption({ label: 'Terminé' });

        await mockPutProject(page);
        await mockGetProject(page, updatedProject);
        await Promise.all([
            page.waitForNavigation({ url: /\/projects\/\d+/ }),
            page.getByRole("button", { name: "Modifier" }).click()
        ]);

        await expect(page).toHaveURL(/\/projects\/\d+/);
        await expect(page.getByText('Projet Alpha')).toBeVisible();
        await expect(page.getByText('Terminé')).toBeVisible();
    });

    test('cant update a project (bad form)', async ({ page }) => {
        await expect(page).toHaveURL(/\/projects\/\d+/);
        
        await mockGetProject(page, project);
        await page.locator('#project-config-button').click();

        await expect(page.locator("#update-project-button")).toBeVisible({ timeout: 10000 });
        await page.locator("#update-project-button").click();
        await expect(page).toHaveURL(/\/projects\/\d+\/config/);
        await page.getByPlaceholder('Nom du projet *').fill('');

        await expect(page.locator('input:invalid')).toHaveCount(1);
        await expect(page).toHaveURL(/\/projects\/\d+/);
    });

    test('delete a project', async ({ page }) => {
        await expect(page).toHaveURL(/\/projects\/\d+/);
        
        await mockGetProject(page, project);
        await page.locator('#project-config-button').click();

        await expect(page.getByRole('heading', { name: 'Configuration', level: 1 })).toBeVisible();
        await expect(page).toHaveURL(/\/projects\/\d+\/config/);
        await expect(page.getByText('Projet Alpha')).toBeVisible();

        await mockDeleteProject(page);
        await mockGetProjects(page, false, projects_after_delete);
        await page.locator("#Supprimer-button").click();
        await page.getByRole("button", { name: "Supprimer" }).click();
        await page.goto('/projects');

        expect(page.url()).toMatch(/\/projects/);
        await expect(page.getByText('Projet Alpha')).not.toBeVisible();
        await expect(page.getByText('Projet Beta')).toBeVisible();
    });
});