import { test, expect } from '@playwright/test';
import { mockAuth } from '../__mocks__/requests/mockAuth';
import { mockGetProjects, mockGetProject, mockDeleteProject, mockPutProject } from '../__mocks__/requests/mockProjectsRequests';
import { project, projects, projects_after_delete, updatedProject } from "../__mocks__/datas/mockProjects";
import { mockGetClients } from "../__mocks__/requests/mockClientsRequests";
import { clients } from "../__mocks__/datas/mockClients";

test.describe('PROJET', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await mockGetProjects(page, false, projects);
        await page.goto('/projects');

        expect(page.url()).toMatch(/\/projects/);

        await mockGetProject(page, project);
        await page.locator('#project-link-button').first().click();

        expect(page.url()).toMatch(/\/projects\/\d+/);
    });

    test('get project', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Projet : Projet Alpha', level: 1 })).toBeVisible();
        await expect(page.getByText('Statut : En cours')).toBeVisible();
    });

    test('go to project config', async ({ page }) => {
        await mockGetProject(page, project);
        await mockGetClients(page, clients);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);
        await expect(page.getByRole('heading', { name: 'Configuration', level: 1 })).toBeVisible();
        await expect(page.getByText('Projet Alpha')).toBeVisible();
        await expect(page.getByText('En cours')).toBeVisible();
    });

    test('back to project', async ({ page }) => {
        await mockGetProject(page, project);
        await mockGetClients(page, clients);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);

        await page.locator('#back-to-project-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+/);
    });

    test('update a project', async ({ page }) => {
        await mockGetProject(page, project);
        await mockGetClients(page, clients);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);

        await page.locator("#update-project-form-button").click();
        await page.locator("#edit-project-status-select").selectOption({ label: 'Terminé' });

        await mockPutProject(page);
        await mockGetProject(page, updatedProject);
        await page.locator("#update-project-submit-button").click();
        await page.goto('/projects/1/config');

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);
        await expect(page.getByText('Projet Alpha')).toBeVisible();
        await expect(page.getByText('Terminé')).toBeVisible();
    });

    test('cant update a project (bad form)', async ({ page }) => {
        await mockGetProject(page, project);
        await mockGetClients(page, clients);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);

        await page.locator("#update-project-form-button").click();
        await page.locator("#edit-project-name-input").fill('');

        await expect(page.locator('#edit-project-name-input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/projects\/\d+\/config/);
    });

    test('delete a project', async ({ page }) => {
        await mockGetProject(page, project);
        await mockGetClients(page, clients);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);

        await expect(page.locator("#Supprimer-button")).toBeEnabled();
        await mockDeleteProject(page);
        await mockGetProjects(page, false, projects_after_delete);
        await page.locator("#Supprimer-button").click();
        await page.locator("#Supprimer-confirm-button").click();
        await page.goto('/projects');

        expect(page.url()).toMatch(/\/projects/);
        await expect(page.getByText('Projet Alpha')).not.toBeVisible();
        await expect(page.getByText('Projet Beta')).toBeVisible();
    });
});