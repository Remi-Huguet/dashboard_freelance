import { GET, POST } from '@/app/api/clients/route';
import { prismaMock } from '../__mocks__/prismaMock';

describe('/api/clients', () => {
  const baseUrl = 'http://localhost/api/clients';

  it('GET [SUCCESS CASE] must return the clients list', async () => {
    const fakeClients = [
      { id: '1', name: 'Alice', surname: 'Doe', email: 'alice@example.com', company: null },
      { id: '2', name: 'Bob', surname: 'Smith', email: 'bob@example.com', company: "company" },
    ];

    prismaMock.client.findMany.mockResolvedValue(fakeClients);

    const req = new Request(baseUrl, {
      method: 'GET'
    });
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(fakeClients);
    expect(prismaMock.client.findMany).toHaveBeenCalled();
  });

  it('GET [ERROR CASE] must not return the clients list (db error)', async () => {
    prismaMock.client.findMany.mockRejectedValue(new Error('Database error'));

    const req = new Request(baseUrl, {
      method: 'GET'
    });
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.client.findMany).toHaveBeenCalled();
  });

  it('POST [SUCCESS CASE] must create a new client', async () => {
    const newClient = { name: 'John', surname: 'Doe', email: 'john@example.com', company: null };
    const createdClient = { ...newClient, id: 'abc123' };

    prismaMock.client.create.mockResolvedValue(createdClient);

    const req = new Request(baseUrl, {
      method: 'POST',
      body: JSON.stringify(newClient),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data).toEqual(createdClient);
    expect(prismaMock.client.create).toHaveBeenCalledWith({
      data: newClient,
    });
  });

  it('POST [ERROR CASE] must not create a new client (bad data in body)', async () => {
    const invalidClient  = { name: null, surname: null, email: 'john@example.com', company: 'company' };

    prismaMock.client.create.mockRejectedValue(new Error('Invalid data'));

    const req = new Request(baseUrl, {
      method: 'POST',
      body: JSON.stringify(invalidClient),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Invalid data' });
    expect(prismaMock.client.create).toHaveBeenCalledWith({ 
      data: invalidClient 
    });
  });

  it('POST [ERROR CASE] must not create a new client (db error)', async () => {
    const newClient = { name: 'John', surname: 'Doe', email: 'john@example.com', company: null };

    prismaMock.client.create.mockRejectedValue(new Error('Database error'));

    const req = new Request(baseUrl, {
      method: 'POST',
      body: JSON.stringify(newClient),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.client.create).toHaveBeenCalledWith({
      data: newClient,
    });
  });
});
