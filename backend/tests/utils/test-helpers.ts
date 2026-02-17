import { expect } from 'vitest';
import request from 'supertest';
import { app } from '../../src/index.js';
import { testCredentials } from '../db/test-seed.js';

/**
 * Helper per fare login come admin nei test di integrazione
 * Restituisce token e dati utente per evitare login multipli
 */
export async function loginAsAdmin() {
  const res = await request(app).post('/api/auth/login').send({
    identifier: testCredentials.admin.email,
    password: testCredentials.admin.password,
  });
  
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('utente');
  expect(res.body.utente).toHaveProperty('ruolo', 'admin');
  
  return {
    token: res.body.token as string,
    utente: res.body.utente,
  };
}

/**
 * Helper per fare login come collaboratore nei test di integrazione
 * Restituisce token e dati utente per evitare login multipli
 */
export async function loginAsCollaboratore() {
  const res = await request(app).post('/api/auth/login').send({
    identifier: testCredentials.collaboratore.username,
    password: testCredentials.collaboratore.password,
  });
  
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('utente');
  expect(res.body.utente).toHaveProperty('ruolo', 'collaboratore');
  
  return {
    token: res.body.token as string,
    utente: res.body.utente,
  };
}

