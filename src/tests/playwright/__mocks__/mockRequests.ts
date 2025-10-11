import { Page } from "@playwright/test";
import { newClient, updatedClient } from "../__mocks__/datas/mockClients";
import { newProject, updatedProject } from "../__mocks__/datas/mockProjects";
import { new_appointment, updated_appointment } from "../__mocks__/datas/mockAppointments";

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

export const mockGetAppointments = async (page: Page, currentWeek: boolean, appointments: unknown[]) => {
    await page.route(`**/api/appointments${currentWeek ? "?currentWeek=true" : ""}`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(appointments),
        });
    });
}

export const mockGetAppointmentsByProject = async (page: Page, currentWeek: boolean, appointments: unknown[]) => {
    await page.route(`**/api/projects/1/appointments${currentWeek ? "?currentWeek=true" : ""}`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(appointments),
        });
    });
}

export const mockPostAppointment = async (page: Page) => {
    await page.route(`**/api/appointments`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(new_appointment),
        });
    });
}

export const mockPutAppointment = async (page: Page) => {
    await page.route(`**/api/appointments/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(updated_appointment),
        });
    });
}

export const mockDeleteAppointment = async (page: Page) => {
    await page.route(`**/api/appointments/1`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json'
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