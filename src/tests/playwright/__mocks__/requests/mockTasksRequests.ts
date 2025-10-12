import { Page } from "@playwright/test";
import { new_task, updated_task } from "../datas/mockTasks";

export const mockGetTasksByProject = async (page: Page, tasks: unknown[], taskType: string = "") => {
    await page.route(`**/api/projects/1/tasks${taskType === "" ? "" : `?taskType=${taskType}`}`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(tasks),
        });
    });
}

export const mockPostTask = async (page: Page) => {
    await page.route(`**/api/tasks`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: JSON.stringify(new_task),
        });
    });
}

export const mockPutTask = async (page: Page) => {
    await page.route(`**/api/tasks/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: JSON.stringify(updated_task),
        });
    });
}

export const mockDeleteTask = async (page: Page) => {
    await page.route(`**/api/tasks/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json'
        });
    });
}