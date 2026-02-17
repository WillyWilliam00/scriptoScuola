/**
 * Verifica se aggiungendo nuoveCopie si supererebbe il limite
 * Funzione pura: nessuna dipendenza da DB o altri moduli
 * 
 * @param copieEffettuate - Numero di copie già effettuate
 * @param nuoveCopie - Numero di copie che si vuole aggiungere
 * @param limite - Limite massimo di copie consentite
 * @returns true se si supererebbe il limite, false altrimenti
 */
export function wouldExceedLimit(
  copieEffettuate: number,
  nuoveCopie: number,
  limite: number
): boolean {
  return copieEffettuate + nuoveCopie > limite;
}
