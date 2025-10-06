import { GET, PUT, DELETE } from '@/app/api/clients/[id]/route';
import { prismaMock } from '../__mocks__/prismaMock';

describe('/api/clients/[id]', () => {
  const fakeClient = {
    id: '1',
    name: 'Alice',
    surname: 'Doe',
    email: 'alice@example.com',
    company: null
  };

  it('GET [SUCCESS CASE] must return a client', async () => {
    prismaMock.client.findUnique.mockResolvedValue(fakeClient);

    const req = new Request('http://localhost/api/clients/1', {
      method: 'GET',
    });
    const res = await GET(req, { params: Promise.resolve({ id: '1' }) });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(fakeClient);
    expect(prismaMock.client.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('GET [ERROR CASE] must not return a client (client not exist)', async () => {
    prismaMock.client.findUnique.mockResolvedValue(null);

    const req = new Request('http://localhost/api/clients/1', {
      method: 'GET',
    });
    const res = await GET(req, { params: Promise.resolve({ id: '1' }) });
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data).toEqual({ error: 'Aucun client trouvé' });
    expect(prismaMock.client.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('GET [ERROR CASE] must not return a client (db error)', async () => {
    prismaMock.client.findUnique.mockRejectedValue(new Error('Database error'));

    const req = new Request('http://localhost/api/clients/1', {
      method: 'GET',
    });
    const res = await GET(req, { params: Promise.resolve({ id: '1' }) });
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.client.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('PUT [SUCCESS CASE] must update a client', async () => {
    const updatedData = { name: 'Alice Updated', company: 'company' };
    const updated = { ...fakeClient, ...updatedData };
    prismaMock.client.update.mockResolvedValue(updated);

    const req = new Request('http://localhost/api/clients/1', {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });

    const res = await PUT(req, { params: Promise.resolve({ id: '1' }) });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.name).toBe('Alice Updated');
    expect(prismaMock.client.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedData,
    });
  });

  it('PUT [ERROR CASE] must not update a client (bad data in body)', async () => {
    const updatedData = { name: null, company: 'company' };
    prismaMock.client.update.mockRejectedValue(new Error('Invalid data'));

    const req = new Request('http://localhost/api/clients/1', {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });

    const res = await PUT(req, { params: Promise.resolve({ id: '1' }) });
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Invalid data' });
    expect(prismaMock.client.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedData,
    });
  });

  it('PUT [ERROR CASE] must not update a client (db error)', async () => {
    const updatedData = { name: 'Alice Updated', company: 'company' };
    prismaMock.client.update.mockRejectedValue(new Error('Database error'));

    const req = new Request('http://localhost/api/clients/1', {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });

    const res = await PUT(req, { params: Promise.resolve({ id: '1' }) });
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.client.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedData,
    });
  });

  it('DELETE [SUCCESS CASE] must delete a client', async () => {
    prismaMock.project.findMany.mockResolvedValue([]);
    prismaMock.client.delete.mockResolvedValue(fakeClient);

    const req = new Request('http://localhost/api/clients/1', {
      method: 'DELETE'
    });
    const res = await DELETE(req, { params: Promise.resolve({ id: '1' }) });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ message: "Client supprimé" });
    expect(prismaMock.client.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('DELETE [ERROR CASE] must not delete a client (if he is linked to a project)', async () => {
    prismaMock.project.findMany.mockResolvedValue([{ id: 'p1', clientId: '1', name: 'Project 1', status: 'En cours' }]);

    const req = new Request('http://localhost/api/clients/1', { method: 'DELETE' });
    const context = { params: Promise.resolve({ id: '1' }) };

    const res = await DELETE(req, context);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data).toEqual({ error: "Impossible de supprimer le client avec des projets associés" });
    expect(prismaMock.client.delete).not.toHaveBeenCalled();
  });

  it('DELETE [ERROR CASE] must not delete a client (db error)', async () => {
    prismaMock.project.findMany.mockResolvedValue([]);
    prismaMock.client.delete.mockRejectedValue(new Error('Database error'));

    const req = new Request('http://localhost/api/clients/1', {
      method: 'DELETE'
    });
    const res = await DELETE(req, { params: Promise.resolve({ id: '1' }) });
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.client.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });
});
