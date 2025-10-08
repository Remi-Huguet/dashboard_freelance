import { GET, POST } from '@/app/api/links/route';
import { prismaMock } from '../../__mocks__/prismaMock';

describe('/api/links', () => {
    const baseUrl = "http://localhost/api/links";
    const fakeProject = { id: '1', clientId: '1', name: 'Project 1', status: 'En cours' };

    it('GET [SUCCESS CASE] must return the links list', async () => {
        const fakeLinks = [
            { id: '1', name: "google", url: "https://google.com", projectId: "1" },
            { id: '2', name: "google", url: "https://google.com", projectId: "1" },
        ];

        prismaMock.link.findMany.mockResolvedValue(fakeLinks);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toEqual(fakeLinks);
        expect(prismaMock.link.findMany).toHaveBeenCalled();
    });

    it('GET [ERROR CASE] must not return the links list (db error)', async () => {
        prismaMock.link.findMany.mockRejectedValue(new Error('Database error'));

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();

        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.link.findMany).toHaveBeenCalled();
    });

    it('POST [SUCCESS CASE] must create a new link', async () => {
        const newLink = { name: "google", url: "https://google.com", projectId: "1" };
        const createdLink = { ...newLink, id: 'abc123' };

        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.link.create.mockResolvedValue(createdLink);

        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(newLink),
        });
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(201);
        expect(data).toEqual(createdLink);
        expect(prismaMock.link.create).toHaveBeenCalledWith({
            data: newLink,
        });
    });

    it('POST [ERROR CASE] must not create a new link (bad data in body)', async () => {
        const invalidLink  = { name: null, url: null, projectId: "1" };
    
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.link.create.mockRejectedValue(new Error('Invalid data'));
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(invalidLink),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid data' });
        expect(prismaMock.link.create).toHaveBeenCalledWith({ 
            data: invalidLink 
        });
    });

    it('POST [ERROR CASE] must not create a new invoice (project do not exist)', async () => {
        const invalidLink  = { name: null, url: null, projectId: "1" };
    
        prismaMock.project.findUnique.mockResolvedValue(null);
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(invalidLink),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(404);
        expect(data).toEqual({ error: 'Projet introuvable' });
        expect(prismaMock.invoice.create).not.toHaveBeenCalled();
    });

    it('POST [ERROR CASE] must not create a new link (db error)', async () => {
        const newLink  = { name: "google", url: "https://google.com", projectId: "1" };
    
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.link.create.mockRejectedValue(new Error('Database error'));
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(newLink),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.link.create).toHaveBeenCalledWith({
            data: newLink,
        });
    });
});