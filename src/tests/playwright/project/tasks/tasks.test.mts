import { test, expect } from '@playwright/test';
import { mockAuth } from '../../__mocks__/requests/mockAuth';
import { mockGetProjects, mockGetProject } from '../../__mocks__/requests/mockProjectsRequests';
import { mockGetTasksByProject, mockPostTask, mockPutTask, mockDeleteTask } from '../../__mocks__/requests/mockTasksRequests';
import { projects, project } from "../../__mocks__/datas/mockProjects";
import { tasks_back, tasks_front, tasks_deploy, tasks_doc, tasks, tasks_after_post, tasks_after_put, tasks_after_delete } from "../../__mocks__/datas/mockTasks";

test.describe('TASKS', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await mockGetProjects(page, false, projects);
        await page.goto('/projects');

        expect(page.url()).toMatch(/\/projects/);

        await mockGetProject(page, project);
        await mockGetTasksByProject(page, tasks_back, "Front-end");
        await mockGetTasksByProject(page, tasks_front, "Back-end");
        await mockGetTasksByProject(page, tasks_deploy, "Deploiement");
        await mockGetTasksByProject(page, tasks_doc, "Documentation");
        await page.locator('#project-link-button').first().click();

        expect(page.url()).toMatch(/\/projects\/\d+/);
        await expect(page.locator('#project-config-button')).toBeVisible();
    });

    test('get tasks list', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Tâches du projet', level: 1 })).toBeVisible();
        await expect(page.getByText('0 / 1')).toHaveCount(2);
        await expect(page.getByText('1 / 1')).toHaveCount(2);
    });

    test('go to tasks config', async ({ page }) => {
        await mockGetTasksByProject(page, tasks);
        await page.locator('#tasks-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/tasks/);
        await expect(page.getByRole('heading', { name: 'Tâches du projet', level: 1 })).toBeVisible();

        await expect(page.getByText('Task Alpha')).toBeVisible();
        await expect(page.getByText('Task Beta')).toBeVisible();
        await expect(page.getByText('Task Ceta')).toBeVisible();
        await expect(page.getByText('Task Deta')).toBeVisible();
    });

    test('go back to project', async ({ page }) => {
        await mockGetTasksByProject(page, tasks);
        await page.locator('#tasks-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/tasks/);

        await expect(page.getByRole('heading', { name: 'Tâches du projet', level: 1 })).toBeVisible();
        await page.locator('#back-to-project-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+/);
    });

    test('create a task', async ({ page }) => {
        await mockGetTasksByProject(page, tasks);
        await page.locator('#tasks-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/tasks/);

        await page.waitForTimeout(3000);
        await page.locator('#create-task-form-button').click();
        await page.locator('#create-task-title-input').fill('Nouvelle task');
        await page.locator('#create-task-description-input').fill('Task desc');
        await page.locator('#create-task-type-select').selectOption('Documentation');

        await mockPostTask(page);
        await mockGetTasksByProject(page, tasks_after_post);
        await page.locator('#create-task-submit-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/tasks/);
        await expect(page.getByText('Nouvelle task')).toBeVisible();
        await expect(page.locator('#create-task-title-input')).not.toBeVisible();
    });

    test('cant create a task (bad form)', async ({ page }) => {
        await mockGetTasksByProject(page, tasks);
        await page.locator('#tasks-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/tasks/);

        await page.waitForTimeout(3000);
        await page.locator('#create-task-form-button').click();
        await page.locator('#create-task-description-input').fill('Task desc');
        await page.locator('#create-task-type-select').selectOption('Documentation');

        await expect(page.locator('#create-task-title-input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/projects\/\d+\/tasks/);
    });

    test('update a task', async ({ page }) => {
        await mockGetTasksByProject(page, tasks);
        await page.locator('#tasks-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/tasks/);

        await page.waitForTimeout(3000);
        await page.locator('#edit-task-form-button').first().click();
        await page.locator('#edit-task-title-input').fill('Task SUIIIIIIII');
        
        await mockPutTask(page);
        await mockGetTasksByProject(page, tasks_after_put);
        await page.locator('#edit-task-submit-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/tasks/);
        await expect(page.getByText('Task SUIIIIIIII')).toBeVisible();
        await expect(page.getByText('Task Alpha')).not.toBeVisible();
    });

    test('cant update a task (bad form)', async ({ page }) => {
        await mockGetTasksByProject(page, tasks);
        await page.locator('#tasks-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/tasks/);

        await page.waitForTimeout(3000);
        await page.locator('#edit-task-form-button').first().click();
        await page.locator('#edit-task-title-input').fill('');
        
        await expect(page.locator('#edit-task-title-input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/projects\/\d+\/tasks/);
    });

    test('delete a task', async ({ page }) => {
        await mockGetTasksByProject(page, tasks);
        await page.locator('#tasks-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/tasks/);

        await expect(page.locator("#Supprimer-button").first()).toBeEnabled();
        await mockDeleteTask(page);
        await mockGetTasksByProject(page, tasks_after_delete);
        await page.locator("#Supprimer-button").first().click();
        await page.locator("#Supprimer-confirm-button").click();
        await page.goto('/projects/1/tasks');
        
        await expect(page).toHaveURL(/\/projects\/\d+\/tasks/);
        await expect(page.getByText('Task Alpha')).not.toBeVisible();
        await expect(page.getByText('Task Beta')).toBeVisible();
    });
});