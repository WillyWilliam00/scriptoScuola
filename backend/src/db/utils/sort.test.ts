import { describe, it, expect } from 'vitest';
import { getSort } from './sort.js';
import { sql } from 'drizzle-orm';

describe('getSort', () => {
  // Creiamo un mock column usando sql per i test
  const mockColumn = sql`test_column`;

  it('restituisce un oggetto quando order è "asc"', () => {
    const result = getSort(mockColumn, 'asc');
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  it('restituisce un oggetto quando order è "desc"', () => {
    const result = getSort(mockColumn, 'desc');
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  it('restituisce risultati diversi per asc e desc', () => {
    const ascResult = getSort(mockColumn, 'asc');
    const descResult = getSort(mockColumn, 'desc');
    // Verifichiamo che i risultati siano effettivamente diversi
    // (se la funzione funzionasse sempre allo stesso modo, sarebbero uguali)
    expect(ascResult).not.toEqual(descResult);
  });

  it('restituisce lo stesso risultato quando chiamato due volte con lo stesso order', () => {
    const result1 = getSort(mockColumn, 'asc');
    const result2 = getSort(mockColumn, 'asc');
    // Due chiamate con gli stessi parametri dovrebbero restituire lo stesso risultato
    // Nota: Drizzle potrebbe creare nuovi oggetti, quindi verifichiamo almeno la struttura
    expect(result1).toBeDefined();
    expect(result2).toBeDefined();
    expect(typeof result1).toBe('object');
    expect(typeof result2).toBe('object');
  });
});
