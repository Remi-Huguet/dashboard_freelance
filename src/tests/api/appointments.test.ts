import { GET, POST } from '@/app/api/appointments/route';
import { prismaMock } from '../__mocks__/prismaMock';
import { appointmentWIthDateToIso } from '../utils';

describe('/api/appointments', () => {
    const baseUrl = "http://localhost/api/appointments";
    const fakeProject = { id: '1', clientId: '1', name: 'Project 1', status: 'En cours' };

    it('GET [SUCCESS CASE] must return the appointments list', async () => {
        const fakeAppointments = [
            { id: '1', title: "1er rdv", date: new Date(), projectId: "1" },
            { id: '2', title: "point moitié", date: new Date(), projectId: "1" },
        ];

        prismaMock.appointment.findMany.mockResolvedValue(fakeAppointments);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();
        const expected = fakeAppointments.map((a) =>
            appointmentWIthDateToIso(a)
        )

        expect(res.status).toBe(200);
        expect(data).toEqual(expected);
        expect(prismaMock.appointment.findMany).toHaveBeenCalled();
    });

    it('GET [SUCCESS CASE] must return the appointments list (with params currentWeek)', async () => {
        const fakeAppointments = [
            { id: '1', title: "1er rdv", date: new Date(), projectId: "1" },
            { id: '2', title: "point moitié", date: new Date(), projectId: "1" },
        ];

        prismaMock.appointment.findMany.mockResolvedValue(fakeAppointments);

        const req = new Request(`${baseUrl}?currentWeek=true`, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();
        const expected = fakeAppointments.map((a) =>
            appointmentWIthDateToIso(a)
        )

        expect(res.status).toBe(200);
        expect(data).toEqual(expected);
        expect(prismaMock.appointment.findMany).toHaveBeenCalled();
    });

    it('GET [ERROR CASE] must not return the appointments list (db error)', async () => {
        prismaMock.appointment.findMany.mockRejectedValue(new Error('Database error'));

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();

        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.appointment.findMany).toHaveBeenCalled();
    });

    it('POST [SUCCESS CASE] must create a new appointment', async () => {
        const newAppointment = { title: "titre", date: new Date(), projectId: "1" };
        const createdAppointment = { ...newAppointment, id: 'abc123' };

        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.appointment.create.mockResolvedValue(createdAppointment);

        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(newAppointment),
        });
        const res = await POST(req);
        const data = await res.json();
        const expected = appointmentWIthDateToIso(createdAppointment);
        const called = appointmentWIthDateToIso(newAppointment);

        expect(res.status).toBe(201);
        expect(data).toEqual(expected);
        expect(prismaMock.appointment.create).toHaveBeenCalledWith({
            data: called,
        });
    });

    it('POST [ERROR CASE] must not create a new appointment (bad data in body)', async () => {
        const invalidAppointment  = { title: null, date: new Date(), projectId: "1" };
    
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.appointment.create.mockRejectedValue(new Error('Invalid data'));
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(invalidAppointment),
        });
        const res = await POST(req);
        const data = await res.json();
        const expected = appointmentWIthDateToIso(invalidAppointment);
    
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid data' });
        expect(prismaMock.appointment.create).toHaveBeenCalledWith({ 
            data: expected 
        });
    });

    it('POST [ERROR CASE] must not create a new appointment (project do not exist)', async () => {
        const invalidAppointment  = { title: "titre", date: new Date(), projectId: "2" };
    
        prismaMock.project.findUnique.mockResolvedValue(null);
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(invalidAppointment),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(404);
        expect(data).toEqual({ error: 'Projet introuvable' });
        expect(prismaMock.appointment.create).not.toHaveBeenCalled();
    });

    it('POST [ERROR CASE] must not create a new appointment (db error)', async () => {
        const newAppointment  = { title: "titre", date: new Date(), projectId: "1" };
    
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.appointment.create.mockRejectedValue(new Error('Database error'));
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(newAppointment),
        });
        const res = await POST(req);
        const data = await res.json();
        const expected = appointmentWIthDateToIso(newAppointment);
    
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.appointment.create).toHaveBeenCalledWith({
            data: expected,
        });
    });
});