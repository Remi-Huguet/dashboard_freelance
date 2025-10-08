import { GET, PUT, DELETE } from '@/app/api/tasks/[id]/route';
import { prismaMock } from '../__mocks__/prismaMock';

describe('/api/tasks/[id]', () => {
    const idTask = "1";
    const baseUrl = "http://localhost/api/tasks/" + idTask;
    const fakeTask = { 
        id: idTask, 
        title: "tests front", 
        desc: "desc", 
        type: "Front-end", 
        done: true, 
        projectId: "1" 
    };
    const baseParams = { params: Promise.resolve({ id: idTask }) };
    const fakeProject = { id: '1', clientId: '1', name: 'Project 1', status: 'En cours' }

    it('GET [SUCCESS CASE] must return a task', async () => {
        prismaMock.task.findUnique.mockResolvedValue(fakeTask);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data).toEqual(fakeTask);
        expect(prismaMock.task.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
        });
    });

    it('GET [ERROR CASE] must not return a task (task not exist)', async () => {
        prismaMock.task.findUnique.mockResolvedValue(null);
        
        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();

        expect(res.status).toBe(404);
        expect(data).toEqual({ error: 'Pas de tâche trouvée' });
        expect(prismaMock.task.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
        });
    });
    
    it('GET [ERROR CASE] must not return a task (db error)', async () => {
        prismaMock.task.findUnique.mockRejectedValue(new Error('Database error'));
        
        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.task.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
        });
    });

    it('PUT [SUCCESS CASE] must update a task', async () => {
        const updatedData = { title: "jsp" };
        const updatedTask = { ...fakeTask, ...updatedData };
      
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.task.update.mockResolvedValue(updatedTask);
      
        const req = new Request(baseUrl, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(200);
        expect(data.title).toBe("jsp");
        expect(prismaMock.task.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: updatedData,
        });
    });

    it('PUT [ERROR CASE] must not update a task (bad data in body)', async () => {
        const updatedBadData = { title: null };
      
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.task.update.mockRejectedValue(new Error('Invalid data'));
      
        const req = new Request(baseUrl, {
            method: 'PUT',
            body: JSON.stringify(updatedBadData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid data' });
        expect(prismaMock.task.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: updatedBadData,
        });
    });

    it('PUT [ERROR CASE] must not update a task (project do not exist)', async () => {
        const updatedBadData = { projectId: "2" };
      
        prismaMock.project.findUnique.mockResolvedValue(null);
      
        const req = new Request(baseUrl, {
          method: 'PUT',
          body: JSON.stringify(updatedBadData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(404);
        expect(data).toEqual({ error: 'Projet introuvable' });
        expect(prismaMock.task.update).not.toHaveBeenCalledWith();
    });
    
    it('PUT [ERROR CASE] must not update a link (db error)', async () => {
        const updatedData = { title: "jsp" };
      
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.task.update.mockRejectedValue(new Error('Database error'));
      
        const req = new Request(baseUrl, {
          method: 'PUT',
          body: JSON.stringify(updatedData),
        });
        const res = await PUT(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.task.update).toHaveBeenCalledWith({
          where: { id: '1' },
          data: updatedData,
        });
    });

    it('DELETE [SUCCESS CASE] must delete a task', async () => {
        prismaMock.task.delete.mockResolvedValue(fakeTask);
      
        const req = new Request(baseUrl, {
          method: 'DELETE'
        });
        const res = await DELETE(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(200);
        expect(data).toEqual({ message: "Tâche supprimée" });
        expect(prismaMock.task.delete).toHaveBeenCalledWith({
          where: { id: '1' },
        });
    });
    
    it('DELETE [ERROR CASE] must not delete a task (db error)', async () => {
        prismaMock.task.delete.mockRejectedValue(new Error('Database error'));
      
        const req = new Request(baseUrl, {
          method: 'DELETE'
        });
        const res = await DELETE(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.task.delete).toHaveBeenCalledWith({
          where: { id: '1' },
        });
    });
});