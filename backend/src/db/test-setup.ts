import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';

/**
 * Crea una connessione al database di test
 * Usa DATABASE_URL_TEST se disponibile, altrimenti DATABASE_URL
 * 
 * Creiamo il Pool manualmente così possiamo chiuderlo quando necessario
 */
const testDbUrl = process.env.DATABASE_URL_TEST || process.env.DATABASE_URL!;
const pool = new Pool({ connectionString: testDbUrl });
export const testDb = drizzle(pool, { schema });

/**
 * Pulisce tutte le tabelle del database di test
 * Utile per resettare il DB prima/dopo i test
 */
export async function cleanTestDb() {
  
  
 //esistono le foreign key constraints e le sfruttiamo per eliminare i dati
  await testDb.delete(schema.refreshTokens);
  await testDb.delete(schema.istituti);
  
}

/**
 * Chiude la connessione al database di test
 * 
 * IMPORTANTE: Chiama questa funzione dopo tutti i test per evitare che il processo Node.js
 * rimanga in attesa di connessioni aperte. Senza questo, i test potrebbero non terminare.
 */
export async function closeTestDb() {
  await pool.end();
}
