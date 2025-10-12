import { test, expect } from '@playwright/test';
import { mockAuth } from '../__mocks__/requests/mockAuth';
import { mockGetProjects } from '../__mocks__/requests/mockProjectsRequests';
import { mockGetAppointments } from '../__mocks__/requests/mockAppointmentsRequests';
import { appointments } from '../__mocks__/datas/mockAppointments';
import { projects } from '../__mocks__/datas/mockProjects';

test.describe('DASHBOARD', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await mockGetAppointments(page, true, appointments);
        await mockGetProjects(page, true, projects);
        await page.goto('/dashboard');

        expect(page.url()).toMatch(/\/dashboard/);
    });

    test('get user info', async ({ page }) => {
        await expect(page.locator('text=Playwright Test User')).toBeVisible();
    });

    test('get projects list (projects in progress)', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Projets' })).toBeVisible();
        await expect(page.getByText('Projet Alpha')).toBeVisible();
        await expect(page.getByText('Projet Beta')).toBeVisible();
    });

    test('go to a project detail', async ({ page }) => {
        await page.locator('#project-link-button').first().click();

        expect(page.url()).toMatch(/\/projects\/\d+/);
    });

    test('get appointments list (appointments of the current week)', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Rendez-vous' })).toBeVisible();
        await expect(page.getByText('Rdv Alpha')).toBeVisible();
        await expect(page.getByText('Rdv Beta')).toBeVisible();
    });
});