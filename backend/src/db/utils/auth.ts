/**
 * Verifica se un identificatore è un'email o un username
 * Funzione pura: nessuna dipendenza da DB o altri moduli
 * 
 * @param identifier - Stringa da verificare (email o username)
 * @returns true se contiene '@' (email), false altrimenti (username)
 */
export function isEmailIdentifier(identifier: string): boolean {
  return identifier.includes('@');
}
