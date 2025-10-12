import { test, expect } from '@playwright/test';
import { mockAuth } from '../../__mocks__/requests/mockAuth';
import { mockGetProjects, mockGetProject } from '../../__mocks__/requests/mockProjectsRequests';
import { mockGetLinksByProject, mockPostLink, mockPutLink, mockDeleteLink } from '../../__mocks__/requests/mockLinksRequests';
import { projects, project } from "../../__mocks__/datas/mockProjects";
import { links, links_after_post, links_after_put, links_after_delete } from "../../__mocks__/datas/mockLinks";

test.describe('LINKS', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await mockGetProjects(page, false, projects);
        await page.goto('/projects');

        expect(page.url()).toMatch(/\/projects/);

        await mockGetProject(page, project);
        await mockGetLinksByProject(page, links);
        await page.locator('#project-link-button').first().click();

        expect(page.url()).toMatch(/\/projects\/\d+/);
        await expect(page.locator('#project-config-button')).toBeVisible();
    });

    test('get links list', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Liens utiles', level: 2 })).toBeVisible();
        await expect(page.getByText('Link Alpha')).toBeVisible();
        await expect(page.getByText('Link Beta')).toBeVisible();
    });

    test('go to links config', async ({ page }) => {
        await mockGetLinksByProject(page, links);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);

        await expect(page.getByRole('heading', { name: 'Liens utiles', level: 2 })).toBeVisible();
        await expect(page.getByText('Link Alpha')).toBeVisible();
        await expect(page.getByText('Link Beta')).toBeVisible();
    });

    test('filter links list', async ({ page }) => {
        await mockGetLinksByProject(page, links);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);

        await expect(page.getByRole('heading', { name: 'Liens utiles', level: 2 })).toBeVisible();
        await expect(page.getByText('Link Alpha')).toBeVisible();
        await expect(page.getByText('Link Beta')).toBeVisible();
        await page.locator('#filter-links-by-name-input').fill("Alpha");
        await expect(page.getByText('Link Alpha')).toBeVisible();
        await expect(page.getByText('Link Beta')).not.toBeVisible();
    });

    test('create a link', async ({ page }) => {
        await mockGetLinksByProject(page, links);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);

        await page.waitForTimeout(3000);
        await page.locator('#create-link-form-button').click();
        await page.locator('#create-link-name-input').fill('Nouveau link');
        await page.locator('#create-link-url-input').fill('https://link-nouveau.com');
        
        await mockPostLink(page);
        await mockGetLinksByProject(page, links_after_post);
        await page.locator('#create-link-submit-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);
        await expect(page.getByText('Nouveau link')).toBeVisible();
        await expect(page.locator('#create-link-name-input')).not.toBeVisible();
    });

    test('cant create a link (bad form)', async ({ page }) => {
        await mockGetLinksByProject(page, links);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);

        await page.waitForTimeout(3000);
        await page.locator('#create-link-form-button').click();
        await page.locator('#create-link-name-input').fill('Nouveau link');

        await expect(page.locator('#create-link-url-input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/projects\/\d+\/config/);
    });

    test('update a link', async ({ page }) => {
        await mockGetLinksByProject(page, links);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);

        await expect(page.getByText('Link Alpha')).toBeVisible();
        await page.locator('#edit-link-form-button').first().click();
        await page.locator('#edit-link-name-input').fill('Link SUIII');

        await mockPutLink(page);
        await mockGetLinksByProject(page, links_after_put);
        page.locator('#edit-link-submit-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);
        await expect(page.getByText('Link SUIII')).toBeVisible();
        await expect(page.getByText('Link Alpha')).not.toBeVisible();
    });

    test('cant update a link (bad form)', async ({ page }) => {
        await mockGetLinksByProject(page, links);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);

        await expect(page.getByText('Link Alpha')).toBeVisible();
        await page.locator('#edit-link-form-button').first().click();
        await page.locator('#edit-link-name-input').fill('');

        await expect(page.locator('#edit-link-name-input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/projects\/\d+\/config/);
    });

    test('delete a link', async ({ page }) => {
        await mockGetLinksByProject(page, links);
        await page.locator('#project-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/config/);

        await expect(page.locator("#Supprimer-button").first()).toBeEnabled();
        await mockDeleteLink(page);
        await mockGetLinksByProject(page, links_after_delete);
        await page.locator("#Supprimer-button").first().click();
        await page.locator("#Supprimer-confirm-button").click();
        await page.goto('/projects/1/config');
        
        await expect(page).toHaveURL(/\/projects\/\d+\/config/);
        await expect(page.getByText('Link Alpha')).not.toBeVisible();
        await expect(page.getByText('Link Beta')).toBeVisible();
    });
});