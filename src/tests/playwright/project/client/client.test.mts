import { test, expect } from '@playwright/test';
import { mockAuth } from '../../__mocks__/requests/mockAuth';
import { mockGetProjects, mockGetProject } from '../../__mocks__/requests/mockProjectsRequests';
import { project, projects } from "../../__mocks__/datas/mockProjects";
import { mockGetClientById } from "../../__mocks__/requests/mockClientsRequests";

test.describe('CLIENT', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await mockGetProjects(page, false, projects);
        await page.goto('/projects');

        expect(page.url()).toMatch(/\/projects/);

        await mockGetProject(page, project);
        await mockGetClientById(page);
        await page.locator('#project-link-button').first().click();

        expect(page.url()).toMatch(/\/projects\/\d+/);
        await expect(page.locator('#project-config-button')).toBeVisible();
    });

    test('get client of project', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Client : Alice Doe', level: 2 })).toBeVisible();
        await expect(page.getByText('Email : alice@example.com')).toBeVisible();
    });
});