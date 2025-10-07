import { GET, PUT, DELETE } from '@/app/api/clients/[id]/route';
import { prismaMock } from '../__mocks__/prismaMock';

describe('/api/clients/[id]', () => {
  const idClient = '1';
  const baseUrl = 'http://localhost/api/clients/' + idClient;
  const fakeClient = {
    id: idClient,
    name: 'Alice',
    surname: 'Doe',
    email: 'alice@example.com',
    company: null
  };
  const baseParams = { params: Promise.resolve({ id: idClient }) }

  it('GET [SUCCESS CASE] must return a client', async () => {
    prismaMock.client.findUnique.mockResolvedValue(fakeClient);

    const req = new Request(baseUrl, {
      method: 'GET'
    });
    const res = await GET(req, baseParams);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(fakeClient);
    expect(prismaMock.client.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('GET [ERROR CASE] must not return a client (client not exist)', async () => {
    prismaMock.client.findUnique.mockResolvedValue(null);

    const req = new Request(baseUrl, {
      method: 'GET'
    });
    const res = await GET(req, baseParams);
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data).toEqual({ error: 'Aucun client trouvé' });
    expect(prismaMock.client.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('GET [ERROR CASE] must not return a client (db error)', async () => {
    prismaMock.client.findUnique.mockRejectedValue(new Error('Database error'));

    const req = new Request(baseUrl, {
      method: 'GET'
    });
    const res = await GET(req, baseParams);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.client.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('PUT [SUCCESS CASE] must update a client', async () => {
    const updatedData = { name: 'Alice Updated', company: 'company' };
    const updatedClient = { ...fakeClient, ...updatedData };

    prismaMock.client.update.mockResolvedValue(updatedClient);

    const req = new Request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });
    const res = await PUT(req, baseParams);
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

    const req = new Request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });
    const res = await PUT(req, baseParams);
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

    const req = new Request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });
    const res = await PUT(req, baseParams);
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

    const req = new Request(baseUrl, {
      method: 'DELETE'
    });
    const res = await DELETE(req, baseParams);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ message: "Client supprimé" });
    expect(prismaMock.client.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('DELETE [ERROR CASE] must not delete a client (if he is linked to a project)', async () => {
    prismaMock.project.findMany.mockResolvedValue([{ id: '1', clientId: '1', name: 'Project 1', status: 'En cours' }]);

    const req = new Request(baseUrl, {
      method: 'DELETE'
    });
    const res = await DELETE(req, baseParams);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data).toEqual({ error: "Impossible de supprimer le client avec des projets associés" });
    expect(prismaMock.client.delete).not.toHaveBeenCalled();
  });

  it('DELETE [ERROR CASE] must not delete a client (db error)', async () => {
    prismaMock.project.findMany.mockResolvedValue([]);
    prismaMock.client.delete.mockRejectedValue(new Error('Database error'));

    const req = new Request(baseUrl, {
      method: 'DELETE'
    });
    const res = await DELETE(req, baseParams);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.client.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });
});
