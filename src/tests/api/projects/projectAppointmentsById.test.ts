import { GET } from '@/app/api/projects/[id]/appointments/route';
import { prismaMock } from '../../__mocks__/prismaMock';
import { appointmentWIthDateToIso } from '../../utils';

describe('/api/projects/[id]/appointments', () => {
    const idProject = "1";
    const baseUrl = "http://localhost/api/projects/" + idProject + "/appointments";
    const baseParams = { params: Promise.resolve({ id: idProject }) };

    it('GET [SUCCESS CASE] must return the appointments list', async () => {
        const fakeAppointments = [
            { id: '1', title: "1er rdv", date: new Date(), projectId: "1" },
            { id: '2', title: "point moitié", date: new Date(), projectId: "1" },
        ];

        prismaMock.appointment.findMany.mockResolvedValue(fakeAppointments);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();
        const expected = fakeAppointments.map((app) =>
            appointmentWIthDateToIso(app)
        );

        expect(res.status).toBe(200);
        expect(data).toEqual(expected);
        expect(prismaMock.appointment.findMany).toHaveBeenCalledWith({
            where: { projectId: '1' },
            orderBy: { date: 'asc' }
        });
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
        const res = await GET(req, baseParams);
        const data = await res.json();
        const expected = fakeAppointments.map((app) =>
            appointmentWIthDateToIso(app)
        );

        expect(res.status).toBe(200);
        expect(data).toEqual(expected);
        expect(prismaMock.appointment.findMany).toHaveBeenCalledWith({
            where: { projectId: '1' },
            orderBy: { date: 'asc' }
        });
    });
    
    it('GET [ERROR CASE] must not return the appointments list (db error)', async () => {
        prismaMock.appointment.findMany.mockRejectedValue(new Error('Database error'));
        
        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.appointment.findMany).toHaveBeenCalledWith({
            where: { projectId: '1' },
            orderBy: { date: 'asc' }
        });
    });
});