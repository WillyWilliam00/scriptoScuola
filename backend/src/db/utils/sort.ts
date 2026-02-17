import { asc, desc, type AnyColumn, type SQL } from 'drizzle-orm';
import type { SortOrder } from '../../../../shared/types.js';

/**
 * Restituisce la funzione di ordinamento Drizzle (asc o desc) in base all'order
 * Funzione pura: nessuna dipendenza da DB, solo logica di selezione
 * 
 * @param column - Colonna Drizzle da ordinare
 * @param order - Direzione di ordinamento ('asc' o 'desc')
 * @returns Funzione Drizzle asc() o desc() applicata alla colonna
 */
export function getSort(column: AnyColumn | SQL, order: SortOrder) {
  return order === 'asc' ? asc(column) : desc(column);
}
