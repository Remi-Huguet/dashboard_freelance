import { GET, PUT, DELETE } from '@/app/api/projects/[id]/route';
import { prismaMock } from '../../__mocks__/prismaMock';

describe('/api/projects/[id]', () => {
    const idProject = "1";
    const baseUrl = "http://localhost/api/projects/" + idProject;
    const fakeProject = { 
        id: '1', 
        name: "projet nom", 
        status: "En cours", 
        clientId: "1" 
    };
    const baseParams = { params: Promise.resolve({ id: idProject }) };
    const fakeClient = { id: '1', name: 'Alice', surname: 'Doe', email: 'alice@example.com', company: "company" };

    it('GET [SUCCESS CASE] must return a project', async () => {
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toEqual(fakeProject);
        expect(prismaMock.project.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
        });
    });

    it('GET [ERROR CASE] must not return a project (project not exist)', async () => {
        prismaMock.project.findUnique.mockResolvedValue(null);
        
        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();

        expect(res.status).toBe(404);
        expect(data).toEqual({ error: 'Pas de projet trouvé' });
        expect(prismaMock.project.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
        });
    });
    
    it('GET [ERROR CASE] must not return a project (db error)', async () => {
        prismaMock.project.findUnique.mockRejectedValue(new Error('Database error'));
        
        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.project.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
        });
    });

    it('PUT [SUCCESS CASE] must update a project', async () => {
        const updatedData = { name: "jsp" };
        const updatedProject = { ...fakeProject, ...updatedData };
      
        prismaMock.client.findUnique.mockResolvedValue(fakeClient);
        prismaMock.project.update.mockResolvedValue(updatedProject);
      
        const req = new Request(baseUrl, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(200);
        expect(data.name).toBe("jsp");
        expect(prismaMock.project.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: updatedData,
        });
    });

    it('PUT [ERROR CASE] must not update a project (bad data in body)', async () => {
        const updatedBadData = { name: null };
      
        prismaMock.client.findUnique.mockResolvedValue(fakeClient);
        prismaMock.project.update.mockRejectedValue(new Error('Invalid data'));
      
        const req = new Request(baseUrl, {
            method: 'PUT',
            body: JSON.stringify(updatedBadData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid data' });
        expect(prismaMock.project.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: updatedBadData,
        });
    });

    it('PUT [ERROR CASE] must not update a task (client do not exist)', async () => {
        const updatedBadData = { clientId: "2" };
      
        prismaMock.client.findUnique.mockResolvedValue(null);
      
        const req = new Request(baseUrl, {
          method: 'PUT',
          body: JSON.stringify(updatedBadData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(404);
        expect(data).toEqual({ error: 'Client introuvable' });
        expect(prismaMock.project.update).not.toHaveBeenCalledWith();
    });
    
    it('PUT [ERROR CASE] must not update a project (db error)', async () => {
        const updatedData = { name: "jsp" };
      
        prismaMock.client.findUnique.mockResolvedValue(fakeClient);
        prismaMock.project.update.mockRejectedValue(new Error('Database error'));
      
        const req = new Request(baseUrl, {
          method: 'PUT',
          body: JSON.stringify(updatedData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.project.update).toHaveBeenCalledWith({
          where: { id: '1' },
          data: updatedData,
        });
    });

    it('DELETE [SUCCESS CASE] must delete a project', async () => {
        prismaMock.link.deleteMany.mockResolvedValue({ count: 1 });
        prismaMock.appointment.deleteMany.mockResolvedValue({ count: 1 });
        prismaMock.task.deleteMany.mockResolvedValue({ count: 1 });
        prismaMock.invoice.deleteMany.mockResolvedValue({ count: 1 });
        prismaMock.project.delete.mockResolvedValue(fakeProject);
      
        const req = new Request(baseUrl, {
          method: 'DELETE'
        });
        const res = await DELETE(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(200);
        expect(data).toEqual({ message: "Projet supprimé" });
        expect(prismaMock.$transaction).toHaveBeenCalled();
        expect(prismaMock.project.delete).toHaveBeenCalledWith({
          where: { id: '1' },
        });
    });

    it('DELETE [ERROR CASE] must not delete a project (db error)', async () => {
        prismaMock.link.deleteMany.mockResolvedValue({ count: 1 });
        prismaMock.appointment.deleteMany.mockResolvedValue({ count: 1 });
        prismaMock.task.deleteMany.mockResolvedValue({ count: 1 });
        prismaMock.invoice.deleteMany.mockResolvedValue({ count: 1 });
        prismaMock.project.delete.mockRejectedValue(new Error('Database error'));
      
        const req = new Request(baseUrl, {
          method: 'DELETE'
        });
        const res = await DELETE(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.$transaction).toHaveBeenCalled();
        expect(prismaMock.project.delete).toHaveBeenCalledWith({
          where: { id: '1' },
        });
    });
});