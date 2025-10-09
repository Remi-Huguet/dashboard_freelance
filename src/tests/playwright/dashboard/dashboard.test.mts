import { test, expect } from '@playwright/test';
import { mockAuth } from '../__mocks__/mockAuth';
import { mockGetProjects, mockGetAppointments } from '../__mocks__/mockRequests';
import { appointments } from '../__mocks__/datas/mockAppointments';
import { projects } from '../__mocks__/datas/mockProjects';

test.describe('DASHBOARD', () => {

    test('get user info', async ({ page, context }) => {
        await mockAuth(page, context);
        await page.goto('/dashboard');

        expect(page.url()).toMatch(/\/dashboard/);

        await expect(page.locator('text=Playwright Test User')).toBeVisible();
    });

    test('get projects list (projects in progress)', async ({ page, context }) => {
        await mockGetProjects(page, true, projects);
        await mockAuth(page, context);
        await page.goto('/dashboard');

        expect(page.url()).toMatch(/\/dashboard/);

        await expect(page.getByRole('heading', { name: 'Projets' })).toBeVisible();
        await expect(page.getByText('Projet Alpha')).toBeVisible();
        await expect(page.getByText('Projet Beta')).toBeVisible();
    });

    test('go to a project detail', async ({ page, context }) => {
        await mockGetProjects(page, true, projects);
        await mockAuth(page, context);
        await page.goto('/dashboard');

        expect(page.url()).toMatch(/\/dashboard/);

        await page.locator('#project-link-button').first().click();
        await expect(page).toHaveURL(/\/projects\/\d+/);
    });

    test('get appointments list (appointments of the current week)', async ({ page, context }) => {
        await mockGetAppointments(page, true, appointments);
        await mockAuth(page, context);
        await page.goto('/dashboard');

        expect(page.url()).toMatch(/\/dashboard/);

        await expect(page.getByRole('heading', { name: 'Rendez-vous' })).toBeVisible();
        await expect(page.getByText('Rdv Alpha')).toBeVisible();
        await expect(page.getByText('Rdv Beta')).toBeVisible();
    });
});