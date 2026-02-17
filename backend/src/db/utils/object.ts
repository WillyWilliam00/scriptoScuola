/**
 * Rimuove tutte le chiavi con valore undefined o stringa vuota da un oggetto
 * Utile per evitare di inviare undefined o stringhe vuote al database
 * Funzione pura: nessuna dipendenza da DB o altri moduli
 * 
 * @param obj - Oggetto da pulire
 * @returns Nuovo oggetto senza chiavi con valore undefined o stringa vuota
 */
export function stripUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== '')
  ) as Partial<T>;
}
