import { GET } from '@/app/api/projects/[id]/tasks/route';
import { prismaMock } from '../../__mocks__/prismaMock';

describe('/api/projects/[id]/tasks', () => {
    const idProject = "1";
    const baseUrl = "http://localhost/api/projects/" + idProject + "/tasks";
    const baseParams = { params: Promise.resolve({ id: idProject }) };

    it('GET [SUCCESS CASE] must return the tasks list', async () => {
        const fakeTasks = [
            { id: '1', title: "tests front", desc: "desc", type: "Front-end", done: true, projectId: "1" },
            { id: '2', title: "tests back", desc: "desc", type: "Front-end", done: true,  projectId: "1" },
        ];

        prismaMock.task.findMany.mockResolvedValue(fakeTasks);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toEqual(fakeTasks);
        expect(prismaMock.task.findMany).toHaveBeenCalledWith({
            where: { projectId: '1' },
        });
    });

    it('GET [SUCCESS CASE] must return the tasks list (with params taskType)', async () => {
        const fakeTasks = [
            { id: '1', title: "tests front", desc: "desc", type: "Front-end", done: true, projectId: "1" },
            { id: '2', title: "tests back", desc: "desc", type: "Front-end", done: true,  projectId: "1" },
        ];

        prismaMock.task.findMany.mockResolvedValue(fakeTasks);

        const req = new Request(`${baseUrl}?taskType=Front-end`, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toEqual(fakeTasks);
        expect(prismaMock.task.findMany).toHaveBeenCalledWith({
            where: { projectId: '1' },
        });
    });
    
    it('GET [ERROR CASE] must not return the tasks list (db error)', async () => {
        prismaMock.task.findMany.mockRejectedValue(new Error('Database error'));
        
        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.task.findMany).toHaveBeenCalledWith({
            where: { projectId: '1' },
        });
    });
});