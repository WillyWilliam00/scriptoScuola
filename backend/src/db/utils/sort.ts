import { asc, desc, type AnyColumn, type SQL } from 'drizzle-orm';
import type { SortOrder } from '../../../../shared/types.js';

/**
 * Restituisce la funzione di ordinamento Drizzle (asc o desc) in base all'order
 * Funzione pura: nessuna dipendenza da DB, solo logica di selezione
 * 
 * @param column - Colonna Drizzle da ordinare
 * @param order - Direzione di ordinamento ('asc' o 'desc')
 * @param idColumn - Colonna Drizzle ID da ordinare
 * @returns Array di due funzioni Drizzle asc() o desc() applicate alle colonne
 */
export function getSort(column: AnyColumn | SQL, order: SortOrder, idColumn: AnyColumn): [SQL, SQL] {
  const primarySort = order === 'asc' ? asc(column) : desc(column);
  // Aggiungiamo sempre l'ID come secondo criterio (nello stesso ordine del primario)
  const secondarySort = order === 'asc' ? asc(idColumn) : desc(idColumn);
  
  return [primarySort, secondarySort];
}
