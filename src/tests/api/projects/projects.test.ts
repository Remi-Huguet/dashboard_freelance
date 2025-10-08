import { GET, POST } from '@/app/api/projects/route';
import { prismaMock } from '../../__mocks__/prismaMock';

describe('/api/appointments', () => {
    const baseUrl = "http://localhost/api/projects";
    const fakeClient = { id: '1', name: 'Alice', surname: 'Doe', email: 'alice@example.com', company: "company" };

    it('GET [SUCCESS CASE] must return the projects list', async () => {
        const fakeProjects = [
            { id: '1', name: "projet nom", status: "En cours", clientId: "1" },
            { id: '2', name: "projet nom", status: "Terminé", clientId: "2" },
        ];

        prismaMock.project.findMany.mockResolvedValue(fakeProjects);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toEqual(fakeProjects);
        expect(prismaMock.project.findMany).toHaveBeenCalled();
    });

    it('GET [SUCCESS CASE] must return the projects list (with params currentWeek)', async () => {
        const fakeProjects = [
            { id: '1', name: "projet nom", status: "En cours", clientId: "1" },
            { id: '2', name: "projet nom", status: "Terminé", clientId: "2" },
        ];

        prismaMock.project.findMany.mockResolvedValue(fakeProjects);

        const req = new Request(`${baseUrl}?currentWeek=true`, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toEqual(fakeProjects);
        expect(prismaMock.project.findMany).toHaveBeenCalled();
    });

    it('GET [ERROR CASE] must not return the projects list (db error)', async () => {
        prismaMock.project.findMany.mockRejectedValue(new Error('Database error'));

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();

        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.project.findMany).toHaveBeenCalled();
    });

    it('POST [SUCCESS CASE] must create a new project', async () => {
        const newProject = { name: "projet nom", status: "En cours", clientId: "1" };
        const createdProject = { ...newProject, id: 'abc123' };

        prismaMock.client.findUnique.mockResolvedValue(fakeClient)
        prismaMock.project.create.mockResolvedValue(createdProject);

        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(newProject),
        });
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(201);
        expect(data).toEqual(createdProject);
        expect(prismaMock.project.create).toHaveBeenCalledWith({
            data: newProject,
        });
    });

    it('POST [ERROR CASE] must not create a new project (bad data in body)', async () => {
        const invalidProject  = { name: null, status: "En cours", clientId: "1" };
    
        prismaMock.client.findUnique.mockResolvedValue(fakeClient)
        prismaMock.project.create.mockRejectedValue(new Error('Invalid data'));
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(invalidProject),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid data' });
        expect(prismaMock.project.create).toHaveBeenCalledWith({ 
            data: invalidProject 
        });
    });

    it('POST [ERROR CASE] must not create a new project (client do not exist)', async () => {
        const invalidProject  = { name: "projet nom", status: "En cours", clientId: "2" };
    
        prismaMock.client.findUnique.mockResolvedValue(null);
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(invalidProject),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(404);
        expect(data).toEqual({ error: 'Client introuvable' });
        expect(prismaMock.project.create).not.toHaveBeenCalled();
    });

    it('POST [ERROR CASE] must not create a new project (db error)', async () => {
        const newProject = { name: "projet nom", status: "En cours", clientId: "1" };
    
        prismaMock.client.findUnique.mockResolvedValue(fakeClient);
        prismaMock.project.create.mockRejectedValue(new Error('Database error'));
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(newProject),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.project.create).toHaveBeenCalledWith({
            data: newProject,
        });
    });
});