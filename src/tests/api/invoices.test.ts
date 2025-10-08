import { GET, POST } from '@/app/api/invoices/route';
import { prismaMock } from '../__mocks__/prismaMock';
import { invoiceWithDatesToIso } from '../utils';

describe('/api/invoices', () => {
    const baseUrl = "http://localhost/api/invoices";
    const fakeProject = { id: '1', clientId: '1', name: 'Project 1', status: 'En cours' };

    it('GET [SUCCESS CASE] must return the invoices list', async () => {
        const fakeInvoices = [
            { id: '1', dateStart: new Date(), dateEnd: new Date(), pricingValue: 350, pricingType: "Par jour", projectId: "1" },
            { id: '2', dateStart: new Date(), dateEnd: new Date(), pricingValue: 3000, pricingType: "Par mois", projectId: "2" }
        ];

        prismaMock.invoice.findMany.mockResolvedValue(fakeInvoices);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();

        const expected = fakeInvoices.map(i => (
            invoiceWithDatesToIso(i)
        ));

        expect(res.status).toBe(200);
        expect(data).toEqual(expected);
        expect(prismaMock.invoice.findMany).toHaveBeenCalled();
    });

    it('GET [ERROR CASE] must not return the invoices list (db error)', async () => {
        prismaMock.invoice.findMany.mockRejectedValue(new Error('Database error'));

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req);
        const data = await res.json();

        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.invoice.findMany).toHaveBeenCalled();
    });

    it('POST [SUCCESS CASE] must create a new client', async () => {
        const newInvoice = { dateStart: new Date(), dateEnd: new Date(), pricingValue: 350, pricingType: "Par jour", projectId: "1" };
        const createdInvoice = { ...newInvoice, id: 'abc123' };

        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.invoice.findFirst.mockResolvedValue(null);
        prismaMock.invoice.create.mockResolvedValue(createdInvoice);

        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(newInvoice),
        });
        const res = await POST(req);
        const data = await res.json();
        const expected = invoiceWithDatesToIso(createdInvoice);
        const called = invoiceWithDatesToIso(newInvoice);

        expect(res.status).toBe(201);
        expect(data).toEqual(expected);
        expect(prismaMock.invoice.create).toHaveBeenCalledWith({
            data: called,
        });
    });

    it('POST [ERROR CASE] must not create a new invoice (bad data in body)', async () => {
        const invalidInvoice  = { dateStart: new Date(), dateEnd: new Date(), pricingValue: 350, pricingType: null, projectId: "1" };
    
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.invoice.findFirst.mockResolvedValue(null);
        prismaMock.invoice.create.mockRejectedValue(new Error('Invalid data'));
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(invalidInvoice),
        });
        const res = await POST(req);
        const data = await res.json();
        const expected = invoiceWithDatesToIso(invalidInvoice);
    
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Invalid data' });
        expect(prismaMock.invoice.create).toHaveBeenCalledWith({ 
            data: expected 
        });
    });

    it('POST [ERROR CASE] must not create a new invoice (project do not exist)', async () => {
        const invalidInvoice  = { dateStart: new Date(), dateEnd: new Date(), pricingValue: 350, pricingType: null, projectId: "1" };
    
        prismaMock.project.findUnique.mockResolvedValue(null);
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(invalidInvoice),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(404);
        expect(data).toEqual({ error: 'Projet introuvable' });
        expect(prismaMock.invoice.create).not.toHaveBeenCalled();
    });

    it('POST [ERROR CASE] must not create a new invoice (project already have an invoice)', async () => {
        const invalidInvoice  = { dateStart: new Date(), dateEnd: new Date(), pricingValue: 350, pricingType: null, projectId: "1" };
    
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.invoice.findFirst.mockResolvedValue({ id: '1', dateStart: new Date(), dateEnd: new Date(), pricingValue: 350, pricingType: "Par jour", projectId: "1" });
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(invalidInvoice),
        });
        const res = await POST(req);
        const data = await res.json();
    
        expect(res.status).toBe(400);
        expect(data).toEqual({ error: 'Une facture existe déjà pour ce projet.' });
        expect(prismaMock.invoice.create).not.toHaveBeenCalled();
    });

    it('POST [ERROR CASE] must not create a new invoice (db error)', async () => {
        const newInvoice  = { dateStart: new Date(), dateEnd: new Date(), pricingValue: 350, pricingType: null, projectId: "1" };
    
        prismaMock.project.findUnique.mockResolvedValue(fakeProject);
        prismaMock.invoice.findFirst.mockResolvedValue(null);
        prismaMock.invoice.create.mockRejectedValue(new Error('Database error'));
    
        const req = new Request(baseUrl, {
            method: 'POST',
            body: JSON.stringify(newInvoice),
        });
        const res = await POST(req);
        const data = await res.json();
        const expected = invoiceWithDatesToIso(newInvoice);
    
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.invoice.create).toHaveBeenCalledWith({
            data: expected,
        });
    });
});
