import { test, expect } from '@playwright/test';
import { mockAuth } from '../../__mocks__/mockAuth';
import { mockGetProjects, mockGetProject, mockGetAppointmentsByProject, mockPostAppointment, mockPutAppointment, mockDeleteAppointment } from '../../__mocks__/mockRequests';
import { projects, project } from "../../__mocks__/datas/mockProjects";
import { appointments, appointments_after_post, appointments_after_put, appointments_after_delete } from "../../__mocks__/datas/mockAppointments";

test.describe('APPOINTMENTS', () => {
    test.beforeEach(async ({ page, context }) => {
        await mockAuth(page, context);
        await mockGetProjects(page, false, projects);

        await page.goto('/projects');
        await mockGetProject(page, project);
        await mockGetAppointmentsByProject(page, true, appointments);
        await page.locator('#project-link-button').first().click();

        await expect(page).toHaveURL(/\/projects\/\d+/);
        await expect(page.locator('#project-config-button')).toBeVisible({ timeout: 10000 });
    });

    test('get appointments list', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Rendez-vous', level: 1 })).toBeVisible({ timeout: 5000 });
        await expect(page.getByText('Rdv Alpha')).toBeVisible();
        await expect(page.getByText('Rdv Beta')).toBeVisible();
    });

    test('go to appointments config', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);

        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible({ timeout: 10000 });
    });

    test('go back to project', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);

        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible({ timeout: 10000 });
        await page.locator('#back-to-project-button').click({ timeout: 10000 });

        await expect(page).toHaveURL(/\/projects\/\d+/);
    });

    test('filter appointments list', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);

        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('Rdv Alpha')).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('Rdv Beta')).toBeVisible();
        await page.locator('#filter-appointments').selectOption("Tous");
        await expect(page.getByText('Rdv Alpha')).toBeVisible();
        await expect(page.getByText('Rdv Beta')).toBeVisible();
        await page.locator('#filter-appointments').selectOption("Passés");
        await expect(page.getByText('Rdv Alpha')).not.toBeVisible();
        await expect(page.getByText('Rdv Beta')).not.toBeVisible();
    });

    test('create an appointment', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);

        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible({ timeout: 10000 });

        await page.waitForTimeout(3000);
        await expect(page.locator('#create-appointment-form-button')).toBeEnabled();
        await page.locator('#create-appointment-form-button').click();

        await expect(page.locator('input[placeholder="Titre *"]')).toBeVisible({ timeout: 10000 });
        await page.locator('input[placeholder="Titre *"]').fill('Nouvel event');
        
        await mockPostAppointment(page);
        await mockGetAppointmentsByProject(page, false, appointments_after_post);
        await page.locator('#create-appointment-submit-button').click();

        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);
        await expect(page.getByText('Nouvel event',)).toBeVisible({ timeout: 10000 });
        await expect(page.getByPlaceholder('Titre *')).not.toBeVisible();
    });

    test('cant create an appointment (bad form)', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);

        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible({ timeout: 10000 });

        await page.waitForTimeout(3000);
        await expect(page.locator('#create-appointment-form-button')).toBeEnabled();
        await page.locator('#create-appointment-form-button').click();

        await expect(page.locator('input:invalid')).toHaveCount(1);
        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);
    });

    test('update an appointment', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);

        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('Rdv Alpha')).toBeVisible({ timeout: 10000 });
        await page.locator('#edit-appointment-form-button').first().click();
        await expect(page.locator('input[placeholder="Titre *"]')).toBeVisible({ timeout: 10000 });
        await page.locator('input[placeholder="Titre *"]').fill('Rdv SUIII');

        await mockPutAppointment(page);
        await mockGetAppointmentsByProject(page, false, appointments_after_put);
        await Promise.all([
            page.waitForNavigation({ url: /\/projects\/\d+\/appointments/ }),
            page.locator('#edit-appointment-submit-button').click()
        ]);

        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);
        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('Rdv SUIII')).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('Rdv Alpha')).not.toBeVisible({ timeout: 10000 });
    });

    test('cant update an appointment (bad form)', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);

        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('Rdv Alpha')).toBeVisible({ timeout: 10000 });
        await page.locator('#edit-appointment-form-button').first().click();
        await expect(page.locator('input[placeholder="Titre *"]')).toBeVisible({ timeout: 10000 });
        await page.locator('input[placeholder="Titre *"]').fill('');

        await expect(page.locator('input:invalid')).toHaveCount(1);
        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);
    });

    test('delete an appointment', async ({ page }) => {
        await mockGetAppointmentsByProject(page, false, appointments);
        await page.locator('#appointments-config-button').click();

        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);

        await expect(page.getByRole('heading', { name: 'Liste des rendez-vous', level: 3 })).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('Rdv Alpha')).toBeVisible({ timeout: 10000 });
        await mockDeleteAppointment(page);
        await mockGetProjects(page, false, appointments_after_delete);
        await page.locator("#Supprimer-button").first().click({ timeout: 10000 });
        await page.getByRole("button", { name: "Supprimer" }).click();
        await page.goto('/projects/1/appointments');
        
        await expect(page).toHaveURL(/\/projects\/\d+\/appointments/);
        await expect(page.getByText('Rdv Alpha')).not.toBeVisible();
        await expect(page.getByText('Rdv Beta')).toBeVisible();
    });
});