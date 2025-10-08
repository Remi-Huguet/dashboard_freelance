import { GET, PUT, DELETE } from '@/app/api/links/[id]/route';
import { prismaMock } from '../__mocks__/prismaMock';

describe('/api/invoices/[id]', () => {
    const idLink = "1";
    const baseUrl = "http://localhost/api/links/" + idLink;
    const fakeLink = { 
        id: idLink, 
        name: "google",
        url: "https://google.com",
        projectId: "1" 
    };
    const baseParams = { params: Promise.resolve({ id: idLink }) };
    const fakeProject = { id: '1', clientId: '1', name: 'Project 1', status: 'En cours' }

    it('GET [SUCCESS CASE] must return a link', async () => {
        prismaMock.link.findUnique.mockResolvedValue(fakeLink);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toEqual(fakeLink);
        expect(prismaMock.link.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
        });
    });

    it('GET [ERROR CASE] must not return a link (link not exist)', async () => {
        prismaMock.link.findUnique.mockResolvedValue(null);
        
        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();

        expect(res.status).toBe(404);
        expect(data).toEqual({ error: 'Pas de lien trouvé' });
        expect(prismaMock.link.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
        });
    });
    
    it('GET [ERROR CASE] must not return a link (db error)', async () => {
        prismaMock.link.findUnique.mockRejectedValue(new Error('Database error'));
        
        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.link.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
        });
    });

    it('PUT [SUCCESS CASE] must update a link', async () => {
        const updatedData = { name: "jsp" };
        const updatedLink = { ...fakeLink, ...updatedData };
      
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.link.update.mockResolvedValue(updatedLink);
      
        const req = new Request(baseUrl, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(200);
        expect(data.name).toBe("jsp");
        expect(prismaMock.link.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: updatedData,
        });
    });

    it('PUT [ERROR CASE] must not update a link (bad data in body)', async () => {
        const updatedData = { name: null };
      
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.link.update.mockRejectedValue(new Error('Invalid data'));
      
        const req = new Request(baseUrl, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid data' });
        expect(prismaMock.link.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: updatedData,
        });
    });

    it('PUT [ERROR CASE] must not update a link (project do not exist)', async () => {
        const updatedData = { projectId: "2" };
      
        prismaMock.project.findUnique.mockResolvedValue(null);
      
        const req = new Request(baseUrl, {
          method: 'PUT',
          body: JSON.stringify(updatedData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(404);
        expect(data).toEqual({ error: 'Projet introuvable' });
        expect(prismaMock.link.update).not.toHaveBeenCalledWith();
    });
    
    it('PUT [ERROR CASE] must not update a link (db error)', async () => {
        const updatedData = { name: "jsp" };
      
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.link.findFirst.mockResolvedValue(null);
        prismaMock.link.update.mockRejectedValue(new Error('Database error'));
      
        const req = new Request(baseUrl, {
          method: 'PUT',
          body: JSON.stringify(updatedData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.link.update).toHaveBeenCalledWith({
          where: { id: '1' },
          data: updatedData,
        });
    });

    it('DELETE [SUCCESS CASE] must delete a link', async () => {
        prismaMock.link.delete.mockResolvedValue(fakeLink);
      
        const req = new Request(baseUrl, {
          method: 'DELETE'
        });
        const res = await DELETE(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(200);
        expect(data).toEqual({ message: "Lien supprimé" });
        expect(prismaMock.link.delete).toHaveBeenCalledWith({
          where: { id: '1' },
        });
    });
    
    it('DELETE [ERROR CASE] must not delete a link (db error)', async () => {
        prismaMock.link.delete.mockRejectedValue(new Error('Database error'));
      
        const req = new Request(baseUrl, {
          method: 'DELETE'
        });
        const res = await DELETE(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.link.delete).toHaveBeenCalledWith({
          where: { id: '1' },
        });
    });
});