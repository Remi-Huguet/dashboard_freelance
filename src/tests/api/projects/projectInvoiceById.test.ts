import { GET } from '@/app/api/projects/[id]/invoice/route';
import { prismaMock } from '../../__mocks__/prismaMock';
import { invoiceWithDatesToIso } from '../../utils';

describe('/api/projects/[id]/invoices', () => {
    const idProject = "1";
    const baseUrl = "http://localhost/api/projects/" + idProject + "/invoice";
    const baseParams = { params: Promise.resolve({ id: idProject }) };

    it('GET [SUCCESS CASE] must return the invoice', async () => {
        const fakeInvoice = { id: '1', dateStart: new Date(), dateEnd: new Date(), pricingValue: 350, pricingType: "Par jour", projectId: "1" };

        prismaMock.invoice.findFirst.mockResolvedValue(fakeInvoice);

        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();
        const expected = invoiceWithDatesToIso(fakeInvoice);

        expect(res.status).toBe(200);
        expect(data).toEqual(expected);
        expect(prismaMock.invoice.findFirst).toHaveBeenCalledWith({
            where: { projectId: '1' }
        });
    });
    
    it('GET [ERROR CASE] must not return the invoice (db error)', async () => {
        prismaMock.invoice.findFirst.mockRejectedValue(new Error('Database error'));
        
        const req = new Request(baseUrl, {
            method: 'GET'
        });
        const res = await GET(req, baseParams);
        const data = await res.json();
      
        expect(res.status).toBe(500);
        expect(data).toEqual({ error: 'Database error' });
        expect(prismaMock.invoice.findFirst).toHaveBeenCalledWith({
            where: { projectId: '1' }
        });
    });
});