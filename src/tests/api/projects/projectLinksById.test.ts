import { GET } from '@/app/api/projects/[id]/links/route';
import { prismaMock } from '../../__mocks__/prismaMock';

describe('/api/projects/[id]/links', () => {
    const idProject = "1";
    const baseUrl = "http://localhost/api/projects/" + idProject + "/links";
    const baseParams = { params: Promise.resolve({ id: idProject }) };

    it('GET [SUCCESS CASE] must return the links list', async () => {
        const fakeLinks = [
            { id: '1', name: "google", url: "https://google.com", projectId: "1" },
            { id: '2', name: "google", url: "https://google.com", projectId: "1" },
        ];

        prismaMock.link.findMany.mockResolvedValue(fakeLinks);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toEqual(fakeLinks);
        expect(prismaMock.link.findMany).toHaveBeenCalledWith({
            where: { projectId: '1' },
        });
    });
    
    it('GET [ERROR CASE] must not return the links list (db error)', async () => {
        prismaMock.link.findMany.mockRejectedValue(new Error('Database error'));
        
        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.link.findMany).toHaveBeenCalledWith({
            where: { projectId: '1' },
        });
    });
});