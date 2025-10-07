import { GET, PUT, DELETE } from '@/app/api/invoices/[id]/route';
import { prismaMock } from '../__mocks__/prismaMock';

describe('/api/invoices/[id]', () => {
  const idInvoice = "1";
  const baseUrl = "http://localhost/api/invoices/" + idInvoice;
  const fakeInvoice = { 
    id: idInvoice, 
    dateStart: new Date(), 
    dateEnd: new Date(), 
    pricingValue: 350, 
    pricingType: "Par jour", 
    projectId: "1" 
  };
  const baseParams = { params: Promise.resolve({ id: idInvoice }) };
  const fakeProject = { id: '1', clientId: '1', name: 'Project 1', status: 'En cours' }

  it('GET [SUCCESS CASE] must return a invoice', async () => {
    prismaMock.invoice.findUnique.mockResolvedValue(fakeInvoice);

    const req = new Request(baseUrl, {
      method: 'GET'
    });
    const res = await GET(req, baseParams);
    const data = await res.json();
    const expected = {
      ...fakeInvoice,
      dateStart: fakeInvoice.dateStart.toISOString(),
      dateEnd: fakeInvoice.dateEnd?.toISOString(),
    };

    expect(res.status).toBe(200);
    expect(data).toEqual(expected);
    expect(prismaMock.invoice.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('GET [ERROR CASE] must not return a invoice (invoice not exist)', async () => {
    prismaMock.invoice.findUnique.mockResolvedValue(null);

    const req = new Request(baseUrl, {
      method: 'GET'
    });
    const res = await GET(req, baseParams);
    const data = await res.json();
    
    expect(res.status).toBe(404);
    expect(data).toEqual({ error: 'Pas de facture trouvée' });
    expect(prismaMock.invoice.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('GET [ERROR CASE] must not return a invoice (db error)', async () => {
    prismaMock.invoice.findUnique.mockRejectedValue(new Error('Database error'));
  
    const req = new Request(baseUrl, {
      method: 'GET'
    });
    const res = await GET(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.invoice.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('PUT [SUCCESS CASE] must update a invoice', async () => {
    const updatedData = { pricingType: "Par mission" };
    const updated = { ...fakeInvoice, ...updatedData };
  
    prismaMock.project.findUnique.mockResolvedValue(fakeProject);
    prismaMock.invoice.findFirst.mockResolvedValue(null);
    prismaMock.invoice.update.mockResolvedValue(updated);
  
    const req = new Request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });
    const res = await PUT(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(200);
    expect(data.pricingType).toBe("Par mission");
    expect(prismaMock.invoice.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedData,
    });
  });

  it('PUT [ERROR CASE] must not update a invoice (bad data in body)', async () => {
    const updatedData = { pricingType: null };
  
    prismaMock.project.findUnique.mockResolvedValue(fakeProject);
    prismaMock.invoice.findFirst.mockResolvedValue(null);
    prismaMock.invoice.update.mockRejectedValue(new Error('Invalid data'));
  
    const req = new Request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });
    const res = await PUT(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Invalid data' });
    expect(prismaMock.invoice.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedData,
    });
  });

  it('PUT [ERROR CASE] must not update a invoice (project do not exist)', async () => {
    const updatedData = { pricingType: null };
  
    prismaMock.project.findUnique.mockResolvedValue(null);
  
    const req = new Request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });
    const res = await PUT(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(404);
    expect(data).toEqual({ error: 'Projet introuvable' });
    expect(prismaMock.invoice.update).not.toHaveBeenCalledWith();
  });

  it('PUT [ERROR CASE] must not update a invoice (db error)', async () => {
    const updatedData = { pricingType: null };
  
    prismaMock.project.findUnique.mockResolvedValue(fakeProject);
    prismaMock.invoice.findFirst.mockResolvedValue(null);
    prismaMock.invoice.update.mockRejectedValue(new Error('Database error'));
  
    const req = new Request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });
    const res = await PUT(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.invoice.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedData,
    });
  });

  it('DELETE [SUCCESS CASE] must delete a invoice', async () => {
    prismaMock.invoice.delete.mockResolvedValue(fakeInvoice);
  
    const req = new Request(baseUrl, {
      method: 'DELETE'
    });
    const res = await DELETE(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(200);
    expect(data).toEqual({ message: "Facture supprimé" });
    expect(prismaMock.invoice.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('DELETE [ERROR CASE] must not delete a invoice (db error)', async () => {
    prismaMock.invoice.delete.mockRejectedValue(new Error('Database error'));
  
    const req = new Request(baseUrl, {
      method: 'DELETE'
    });
    const res = await DELETE(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.invoice.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });
});