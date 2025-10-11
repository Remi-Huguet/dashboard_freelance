import { Page } from "@playwright/test";
import { newProject, updatedProject } from "../datas/mockProjects";

export const mockGetProjects = async (page: Page, inProgress: boolean, projects: unknown[]) => {
    await page.route(`**/api/projects${inProgress ? "?inProgress=true" : ""}`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(projects),
        });
    });
}

export const mockPostProject = async (page: Page) => {
    await page.route(`**/api/projects`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: newProject
        });
    });
}

export const mockGetProject = async (page: Page, project: unknown) => {
    await page.route(`**/api/projects/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(project),
        });
    });
}

export const mockPutProject = async (page: Page) => {
    await page.route(`**/api/projects/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(updatedProject),
        });
    });
}

export const mockDeleteProject = async (page: Page) => {
    await page.route(`**/api/projects/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json'
        });
    });
}