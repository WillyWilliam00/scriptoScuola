import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../index.js';
import { cleanTestDb } from '../db/test-setup.js';
import { seedTestData } from '../db/test-seed.js';
import { loginAsAdmin, loginAsCollaboratore } from './test-helpers.js';

describe('Rotte /api/registrazioni-copie', () => {
  beforeAll(async () => {
    await cleanTestDb();
    await seedTestData();
  });

  afterAll(async () => {
    await cleanTestDb();
  });

  it('GET /api/registrazioni-copie restituisce lista paginata (admin)', async () => {
    const { token } = await loginAsAdmin();

    const res = await request(app)
      .get('/api/registrazioni-copie')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.pagination).toHaveProperty('page');
    expect(res.body.pagination).toHaveProperty('totalItems');
  });

  it('GET /api/registrazioni-copie con collaboratore restituisce 403 (se route è admin-only)', async () => {
    const { token } = await loginAsCollaboratore();

    const res = await request(app)
      .get('/api/registrazioni-copie')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
  });

  it('GET /api/registrazioni-copie senza token restituisce 401', async () => {
    const res = await request(app).get('/api/registrazioni-copie');
    expect(res.status).toBe(401);
  });

 
  it('POST /api/registrazioni-copie/new-registrazione crea registrazione con admin', async () => {
    const { token: adminToken, utente: adminUtente } = await loginAsAdmin();

    // Ottieni un docente esistente dalla lista
    const docentiRes = await request(app)
      .get('/api/docenti')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(docentiRes.status).toBe(200);
    expect(docentiRes.body.data.length).toBeGreaterThan(0);
    const docenteId = docentiRes.body.data[0].id;

    const res = await request(app)
      .post('/api/registrazioni-copie/new-registrazione')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        docenteId,
        copieEffettuate: 15,
        utenteId: adminUtente.id,
        note: 'Test registrazione admin',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('docenteId', docenteId);
    expect(res.body).toHaveProperty('copieEffettuate', 15);
    expect(res.body).toHaveProperty('utenteId', adminUtente.id);
  });

  it('POST /api/registrazioni-copie/new-registrazione crea registrazione con collaboratore', async () => {
    const { token: collaboratoreToken, utente: collaboratoreUtente } = await loginAsCollaboratore();

    // Ottieni un docente esistente dalla lista (usando token admin per vedere la lista)
    const { token: adminToken } = await loginAsAdmin();
    const docentiRes = await request(app)
      .get('/api/docenti')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(docentiRes.status).toBe(200);
    expect(docentiRes.body.data.length).toBeGreaterThan(0);
    const docenteId = docentiRes.body.data[0].id;
    console.log('docentiRes', docentiRes.body);
    console.log('docenteId', docenteId);
    const res = await request(app)
      .post('/api/registrazioni-copie/new-registrazione')
      .set('Authorization', `Bearer ${collaboratoreToken}`)
      .send({
        docenteId,
        copieEffettuate: 20,
        utenteId: collaboratoreUtente.id,
        note: 'Test registrazione collaboratore',
      });
      
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('docenteId', docenteId);
    expect(res.body).toHaveProperty('copieEffettuate', 20);
    expect(res.body).toHaveProperty('utenteId', collaboratoreUtente.id);
  });

  it('POST /api/registrazioni-copie/new-registrazione senza token restituisce 401', async () => {
    const res = await request(app)
      .post('/api/registrazioni-copie/new-registrazione')
      .send({
        docenteId: 1,
        copieEffettuate: 10,
        utenteId: '123e4567-e89b-12d3-a456-426614174000',
      });

    expect(res.status).toBe(401);
  });

  it('DELETE /api/registrazioni-copie/delete-registrazione/:id elimina registrazione con admin', async () => {
    const { token: adminToken, utente: adminUtente } = await loginAsAdmin();

    // Ottieni un docente esistente per creare una registrazione valida
    const docentiRes = await request(app)
      .get('/api/docenti')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(docentiRes.status).toBe(200);
    expect(docentiRes.body.data.length).toBeGreaterThan(0);
    const docenteId = docentiRes.body.data[0].id;

    const registrazioniRes = await request(app)
      .post('/api/registrazioni-copie/new-registrazione')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        docenteId,
        copieEffettuate: 10,
        utenteId: adminUtente.id,
        note: 'Test registrazione admin',
      });

    expect(registrazioniRes.status).toBe(201);
    const registrazioneId = registrazioniRes.body.id;

    const deleteRes = await request(app)
      .delete(`/api/registrazioni-copie/delete-registrazione/${registrazioneId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toHaveProperty('id');
    expect(deleteRes.body.id).toBe(registrazioneId);
    console.log(deleteRes.body);
  });
  // it('DELETE /api/registrazioni-copie/delete-registrazione/:id con collaboratore restituisce 403', async () => {
  //   const { token: adminToken } = await loginAsAdmin();
  //   const { token: collaboratoreToken } = await loginAsCollaboratore();
  //   const registrazioniRes = await request(app)
  //     .post('/api/registrazioni-copie/new-registrazione')
  //     .set('Authorization', `Bearer ${adminToken}`)
  //     .send({
  //       docenteId: 1,
  //       copieEffettuate: 10,
  //       utenteId: '123e4567-e89b-12d3-a456-426614174000',
  //       note: 'Test registrazione admin',
  //     });
  //   expect(registrazioniRes.status).toBe(201);
  //   console.log(registrazioniRes.body);
  //   const registrazioneId = registrazioniRes.body.id;

  //   const deleteRes = await request(app)
  //     .delete(`/api/registrazioni-copie/delete-registrazione/${registrazioneId}`)
  //     .set('Authorization', `Bearer ${collaboratoreToken}`);
  //   expect(deleteRes.status).toBe(403);
  // });


});

