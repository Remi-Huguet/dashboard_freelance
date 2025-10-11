import { Page } from "@playwright/test";
import { new_appointment, updated_appointment } from "../datas/mockAppointments";

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