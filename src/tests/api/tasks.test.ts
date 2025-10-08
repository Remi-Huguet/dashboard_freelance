import { GET, POST } from '@/app/api/tasks/route';
import { prismaMock } from '../__mocks__/prismaMock';

describe('/api/appointments', () => {
    const baseUrl = "http://localhost/api/tasks";
    const fakeProject = { id: '1', clientId: '1', name: 'Project 1', status: 'En cours' };

    it('GET [SUCCESS CASE] must return the tasks list', async () => {
        const fakeTasks = [
            { id: '1', title: "tests front", desc: "desc", type: "Front-end", done: true, projectId: "1" },
            { id: '2', title: "tests back", desc: "desc", type: "Front-end", done: true,  projectId: "1" },
        ];

        prismaMock.task.findMany.mockResolvedValue(fakeTasks);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toEqual(fakeTasks);
        expect(prismaMock.task.findMany).toHaveBeenCalled();
    });
    
    it('GET [ERROR CASE] must not return the tasks list (db error)', async () => {
        prismaMock.task.findMany.mockRejectedValue(new Error('Database error'));

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();

        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.task.findMany).toHaveBeenCalled();
    });

    it('POST [SUCCESS CASE] must create a new task', async () => {
        const newTask = { title: "tests front", desc: "desc", type: "Front-end", done: true, projectId: "1" };
        const createdTask = { ...newTask, id: 'abc123' };

        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.task.create.mockResolvedValue(createdTask);

        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(newTask),
        });
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(201);
        expect(data).toEqual(createdTask);
        expect(prismaMock.task.create).toHaveBeenCalledWith({
            data: newTask,
        });
    });

    it('POST [ERROR CASE] must not create a new task (bad data in body)', async () => {
        const invalidTask  = { title: null, desc: "desc", type: "Front-end", done: true, projectId: "1" };
    
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.task.create.mockRejectedValue(new Error('Invalid data'));
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(invalidTask),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid data' });
        expect(prismaMock.task.create).toHaveBeenCalledWith({ 
            data: invalidTask 
        });
    });

    it('POST [ERROR CASE] must not create a new task (project do not exist)', async () => {
        const invalidTask  = { title: "titre", desc: "desc", type: "Front-end", done: true, projectId: "2" };
    
        prismaMock.project.findUnique.mockResolvedValue(null);
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(invalidTask),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(404);
        expect(data).toEqual({ error: 'Projet introuvable' });
        expect(prismaMock.link.create).not.toHaveBeenCalled();
    });

    it('POST [ERROR CASE] must not create a new task (db error)', async () => {
        const newTask = { title: "titre", desc: "desc", type: "Front-end", done: true, projectId: "1" };
    
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.task.create.mockRejectedValue(new Error('Database error'));
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(newTask),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.task.create).toHaveBeenCalledWith({
            data: newTask,
        });
    });
});