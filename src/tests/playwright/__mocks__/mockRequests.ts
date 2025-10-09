import { Page } from "@playwright/test";
import { newClient, updatedClient } from "../__mocks__/datas/mockClients";
import { newProject } from "../__mocks__/datas/mockProjects";

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

export const mockGetAppointments = async (page: Page, currentWeek: boolean, appointments: unknown[]) => {
    await page.route(`**/api/appointments?currentWeek=${currentWeek}`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(appointments),
        });
    });
}

export const mockGetClients = async (page: Page, clients: unknown[]) => {
    await page.route(`**/api/clients`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(clients),
        });
    });
}

export const mockPostClient = async (page: Page) => {
    await page.route(`**/api/clients`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: newClient
        });
    });
}

export const mockPutClient = async (page: Page) => {
    await page.route(`**/api/clients/${updatedClient.id}`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: updatedClient
        });
    });
}

export const mockDeleteClient = async (page: Page) => {
    await page.route(`**/api/clients/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json'
        });
    });
}