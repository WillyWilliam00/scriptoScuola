import bcrypt from 'bcrypt';
import { testDb } from './test-setup.js';
import { istituti, utenti, docenti, registrazioniCopie } from '../../src/db/schema.js';

/**
 * Crea dati di test nel database
 * Utile per popolare il DB prima dei test di integrazione
 */
export async function seedTestData() {
  // 1. Crea un istituto di test
  const [istituto] = await testDb.insert(istituti).values({
    nome: 'Scuola Test',
    codiceIstituto: 'TEST123456',
  }).returning();

  if (!istituto) {
    throw new Error('Errore nella creazione dell\'istituto di test');
  }

  // 2. Crea un utente admin di test
  const passwordHashAdmin = await bcrypt.hash('password123', 10);
  const [admin] = await testDb.insert(utenti).values({
    email: 'admin@test.com',
    username: null,
    passwordHash: passwordHashAdmin,
    ruolo: 'admin',
    istitutoId: istituto.id,
  }).returning();

  if (!admin) {
    throw new Error('Errore nella creazione dell\'admin di test');
  }

  // 3. Crea un utente collaboratore di test
  const passwordHashCollaboratore = await bcrypt.hash('password123', 10);
  const [collaboratore] = await testDb.insert(utenti).values({
    email: null,
    username: 'collaboratore_test',
    passwordHash: passwordHashCollaboratore,
    ruolo: 'collaboratore',
    istitutoId: istituto.id,
  }).returning();

  if (!collaboratore) {
    throw new Error('Errore nella creazione del collaboratore di test');
  }

  // 4. Crea alcuni docenti di test
  const docentiTest = await testDb.insert(docenti).values([
    {
      nome: 'Mario',
      cognome: 'Rossi',
      limiteCopie: 100,
      istitutoId: istituto.id,
    },
    {
      nome: 'Luigi',
      cognome: 'Verdi',
      limiteCopie: 50,
      istitutoId: istituto.id,
    },
    {
      nome: 'Anna',
      cognome: 'Bianchi',
      limiteCopie: 200,
      istitutoId: istituto.id,
    },
  ]).returning();

  // 5. Crea alcune registrazioni copie di test
  if (docentiTest.length > 0 && docentiTest[0] && docentiTest[1]) {
    await testDb.insert(registrazioniCopie).values([
      {
        docenteId: docentiTest[0].id,
        copieEffettuate: 10,
        utenteId: admin.id,
        istitutoId: istituto.id,
        note: 'Test registrazione 1',
      },
      {
        docenteId: docentiTest[0].id,
        copieEffettuate: 5,
        utenteId: collaboratore.id,
        istitutoId: istituto.id,
        note: 'Test registrazione 2',
      },
      {
        docenteId: docentiTest[1].id,
        copieEffettuate: 20,
        utenteId: admin.id,
        istitutoId: istituto.id,
      },
    ]);
  }

  return {
    istituto,
    admin,
    collaboratore,
    docenti: docentiTest,
  };
}

/**
 * Dati di test per riferimento nei test
 */
export const testCredentials = {
  admin: {
    email: 'admin@test.com',
    password: 'password123',
  },
  collaboratore: {
    username: 'collaboratore_test',
    password: 'password123',
  },
};

