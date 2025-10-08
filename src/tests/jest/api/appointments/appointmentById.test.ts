import { GET, PUT, DELETE } from '@/app/api/appointments/[id]/route';
import { prismaMock } from '../../__mocks__/prismaMock';
import { appointmentWIthDateToIso } from '../../../testsUtils';

describe('/api/appointments/[id]', () => {
  const idAppointment = "1";
  const baseUrl = "http://localhost/api/appointments/" + idAppointment;
  const fakeAppointment = { 
    id: idAppointment, 
    title: "titre",
    date: new Date(),
    projectId: "1" 
  };
  const baseParams = { params: Promise.resolve({ id: idAppointment }) };
  const fakeProject = { id: '1', clientId: '1', name: 'Project 1', status: 'En cours' }

  it('GET [SUCCESS CASE] must return an appointment', async () => {
    prismaMock.appointment.findUnique.mockResolvedValue(fakeAppointment);

    const req = new Request(baseUrl, {
      method: 'GET'
    });
    const res = await GET(req, baseParams);
    const data = await res.json();
    const expected = appointmentWIthDateToIso(fakeAppointment)

    expect(res.status).toBe(200);
    expect(data).toEqual(expected);
    expect(prismaMock.appointment.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('GET [ERROR CASE] must not return an appointment (appointment not exist)', async () => {
    prismaMock.appointment.findUnique.mockResolvedValue(null);

    const req = new Request(baseUrl, {
      method: 'GET'
    });
    const res = await GET(req, baseParams);
    const data = await res.json();
    
    expect(res.status).toBe(404);
    expect(data).toEqual({ error: 'Pas de rendez-vous trouvé' });
    expect(prismaMock.appointment.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('GET [ERROR CASE] must not return an appointment (db error)', async () => {
    prismaMock.appointment.findUnique.mockRejectedValue(new Error('Database error'));
  
    const req = new Request(baseUrl, {
      method: 'GET'
    });
    const res = await GET(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.appointment.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('PUT [SUCCESS CASE] must update an appointment', async () => {
    const updatedData = { title: "deadline projet" };
    const updatedAppointment = { ...fakeAppointment, ...updatedData };
  
    prismaMock.project.findUnique.mockResolvedValue(fakeProject);
    prismaMock.appointment.update.mockResolvedValue(updatedAppointment);
  
    const req = new Request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });
    const res = await PUT(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(200);
    expect(data.title).toBe("deadline projet");
    expect(prismaMock.appointment.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedData,
    });
  });

  it('PUT [ERROR CASE] must not update an appointment (bad data in body)', async () => {
    const updatedBadData = { title: null };
  
    prismaMock.project.findUnique.mockResolvedValue(fakeProject);
    prismaMock.appointment.update.mockRejectedValue(new Error('Invalid data'));
  
    const req = new Request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify(updatedBadData),
    });
    const res = await PUT(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Invalid data' });
    expect(prismaMock.appointment.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedBadData,
    });
  });

  it('PUT [ERROR CASE] must not update an appointment (project do not exist)', async () => {
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
    expect(prismaMock.appointment.update).not.toHaveBeenCalledWith();
  });

  it('PUT [ERROR CASE] must not update an appointment (db error)', async () => {
    const updatedData = { title: "deadline" };
  
    prismaMock.project.findUnique.mockResolvedValue(fakeProject);
    prismaMock.appointment.update.mockRejectedValue(new Error('Database error'));
  
    const req = new Request(baseUrl, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });
    const res = await PUT(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.appointment.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedData,
    });
  });

  it('DELETE [SUCCESS CASE] must delete an appointment', async () => {
    prismaMock.appointment.delete.mockResolvedValue(fakeAppointment);
  
    const req = new Request(baseUrl, {
      method: 'DELETE'
    });
    const res = await DELETE(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(200);
    expect(data).toEqual({ message: "Rendez-vous supprimé" });
    expect(prismaMock.appointment.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('DELETE [ERROR CASE] must not delete an appointment (db error)', async () => {
    prismaMock.appointment.delete.mockRejectedValue(new Error('Database error'));
  
    const req = new Request(baseUrl, {
      method: 'DELETE'
    });
    const res = await DELETE(req, baseParams);
    const data = await res.json();
  
    expect(res.status).toBe(500);
    expect(data).toEqual({ error: 'Database error' });
    expect(prismaMock.appointment.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });
});