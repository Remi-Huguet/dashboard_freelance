import { test, expect } from '@playwright/test';
import { mockAuth } from '../../__mocks__/requests/mockAuth';
import { mockGetProjects, mockGetProject } from '../../__mocks__/requests/mockProjectsRequests';
import { mockGetAppointmentsByProject, mockPostAppointment, mockPutAppointment, mockDeleteAppointment } from '../../__mocks__/requests/mockAppointmentsRequests';
import { projects, project } from "../../__mocks__/datas/mockProjects";
import { appointments, appointments_after_post, appointments_after_put, appointments_after_delete } from "../../__mocks__/datas/mockAppointments";

test.describe('APPOINTMENTS', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await mockGetProjects(page, false, projects);
        await page.goto('/projects');

        expect(page.url()).toMatch(/\/projects/);

        await mockGetProject(page, project);
        await mockGetAppointmentsByProject(page, true, appointments);
        await page.locator('#project-link-button').first().click();

        expect(page.url()).toMatch(/\/projects\/\d+/);
        await expect(page.locator('#project-config-button')).toBeVisible();
    });

    test('get appointments list', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Rendez-vous', level: 1 })).toBeVisible();
        await expect(page.getByText('Rdv Alpha')).toBeVisible();
        await expect(page.getByText('Rdv Beta')).toBeVisible();
    });

    test('go to appointments config', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/appointments/);

        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible();
        await expect(page.getByText('Rdv Alpha')).toBeVisible();
        await expect(page.getByText('Rdv Beta')).toBeVisible();
    });

    test('go back to project', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/appointments/);

        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible();
        await page.locator('#back-to-project-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+/);
    });

    test('filter appointments list', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/appointments/);

        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible();
        await expect(page.getByText('Rdv Alpha')).toBeVisible();
        await expect(page.getByText('Rdv Beta')).toBeVisible();
        await page.locator('#filter-appointments-by-date-select').selectOption("Tous");
        await expect(page.getByText('Rdv Alpha')).toBeVisible();
        await expect(page.getByText('Rdv Beta')).toBeVisible();
        await page.locator('#filter-appointments-by-date-select').selectOption("Passés");
        await expect(page.getByText('Rdv Alpha')).not.toBeVisible();
        await expect(page.getByText('Rdv Beta')).not.toBeVisible();
    });

    test('create an appointment', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/appointments/);

        await page.waitForTimeout(3000);
        await page.locator('#create-appointment-form-button').click();
        await page.locator('#create-appointment-title-input').fill('Nouvel event');
        
        await mockPostAppointment(page);
        await mockGetAppointmentsByProject(page, false, appointments_after_post);
        await page.locator('#create-appointment-submit-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/appointments/);
        await expect(page.getByText('Nouvel event')).toBeVisible();
        await expect(page.locator('#create-appointment-title-input')).not.toBeVisible();
    });

    test('cant create an appointment (bad form)', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/appointments/);

        await page.waitForTimeout(3000);
        await page.locator('#create-appointment-form-button').click();

        await expect(page.locator('#create-appointment-title-input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/projects\/\d+\/appointments/);
    });

    test('update an appointment', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/appointments/);

        await expect(page.getByText('Rdv Alpha')).toBeVisible();
        await page.locator('#edit-appointment-form-button').first().click();
        await page.locator('#edit-appointment-title-input').fill('Rdv SUIII');

        await mockPutAppointment(page);
        await mockGetAppointmentsByProject(page, false, appointments_after_put);
        page.locator('#edit-appointment-submit-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/appointments/);
        await expect(page.getByText('Rdv SUIII')).toBeVisible();
        await expect(page.getByText('Rdv Alpha')).not.toBeVisible();
    });

    test('cant update an appointment (bad form)', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        expect(page.url()).toMatch(/\/projects\/\d+\/appointments/);

        await expect(page.getByText('Rdv Alpha')).toBeVisible();
        await page.locator('#edit-appointment-form-button').first().click();
        await page.locator('#edit-appointment-title-input').fill('');

        await expect(page.locator('#edit-appointment-title-input:invalid')).toHaveCount(1);
        expect(page.url()).toMatch(/\/projects\/\d+\/appointments/);
    });

    test('delete an appointment', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);

        await expect(page.locator("#Supprimer-button").first()).toBeEnabled();
        await mockDeleteAppointment(page);
        await mockGetAppointmentsByProject(page, false, appointments_after_delete);
        await page.locator("#Supprimer-button").first().click();
        await page.locator("#Supprimer-confirm-button").click();
        await page.goto('/projects/1/appointments');
        
        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);
        await expect(page.getByText('Rdv Alpha')).not.toBeVisible();
        await expect(page.getByText('Rdv Beta')).toBeVisible();
    });
});