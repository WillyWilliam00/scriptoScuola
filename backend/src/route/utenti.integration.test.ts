import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../index.js';
import { cleanTestDb } from '../db/test-setup.js';
import { seedTestData } from '../db/test-seed.js';
import { loginAsAdmin, loginAsCollaboratore } from './test-helpers.js';

describe('Rotte /api/utenti', () => {
  beforeAll(async () => {
    await cleanTestDb();
    await seedTestData();
  });

  afterAll(async () => {
    await cleanTestDb();
  });

  it('GET /api/utenti restituisce lista paginata (solo admin)', async () => {
    const { token } = await loginAsAdmin();

    const res = await request(app)
      .get('/api/utenti')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body).toHaveProperty('page');
    expect(res.body).toHaveProperty('totalItems');
  });

  it('GET /api/utenti con collaboratore restituisce 403', async () => {
    const { token } = await loginAsCollaboratore();

    const res = await request(app)
      .get('/api/utenti')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
  });

  it('GET /api/utenti senza token restituisce 401', async () => {
    const res = await request(app).get('/api/utenti');
    expect(res.status).toBe(401);
  });

  it('POST /api/utenti/new-utente crea un collaboratore (solo admin)', async () => {
    const { token } = await loginAsAdmin();

    const res = await request(app)
      .post('/api/utenti/new-utente')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ruolo: 'collaboratore',
        username: 'collab_integ_test',
        password: 'password123',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.ruolo).toBe('collaboratore');
    expect(res.body.data.username).toBe('collab_integ_test');
  });

  it('PUT /api/utenti/update-utente/:id aggiorna un utente (solo admin)', async () => {
    const { token } = await loginAsAdmin();

    // Crea un utente da aggiornare
    const createRes = await request(app)
      .post('/api/utenti/new-utente')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ruolo: 'collaboratore',
        username: 'collab_da_aggiornare',
        password: 'password123',
      });
    expect(createRes.status).toBe(201);
    const userId = createRes.body.data.id as string;

    const res = await request(app)
      .put(`/api/utenti/update-utente/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      // Nota: in questa codebase la rotta usa createUtenteSchema anche per update
      .send({
        ruolo: 'collaboratore',
        username: 'collab_aggiornato',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.id).toBe(userId);
  });

  it('DELETE /api/utenti/delete-utente/:id elimina un utente (solo admin)', async () => {
    const { token } = await loginAsAdmin();

    // Crea un utente da eliminare
    const createRes = await request(app)
      .post('/api/utenti/new-utente')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ruolo: 'collaboratore',
        username: 'collab_da_eliminare',
        password: 'password123',
      });
    expect(createRes.status).toBe(201);
    const userId = createRes.body.data.id as string;

    const res = await request(app)
      .delete(`/api/utenti/delete-utente/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toBe(userId);
  });
});

