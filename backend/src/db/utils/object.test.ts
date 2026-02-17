import { describe, it, expect } from 'vitest';
import { stripUndefined } from './object.js';

describe('stripUndefined', () => {
  it('rimuove chiavi con valore undefined', () => {
    const input = { a: 1, b: undefined, c: 'test', d: undefined };
    const result = stripUndefined(input);
    expect(result).toEqual({ a: 1, c: 'test' });
  });

  it('rimuove chiavi con stringa vuota', () => {
    const input = { a: '', b: undefined, c: 'test' };
    const result = stripUndefined(input);
    expect(result).toEqual({ c: 'test' });
  });

  it('rimuove sia undefined che stringhe vuote', () => {
    const input = { a: 1, b: undefined, c: '', d: 'test', e: undefined, f: '' };
    const result = stripUndefined(input);
    expect(result).toEqual({ a: 1, d: 'test' });
  });

  it('mantiene chiavi con valore null', () => {
    const input = { a: 1, b: null, c: undefined };
    const result = stripUndefined(input);
    expect(result).toEqual({ a: 1, b: null });
  });

  it('mantiene chiavi con valore 0', () => {
    const input = { a: 0, b: undefined, c: 1 };
    const result = stripUndefined(input);
    expect(result).toEqual({ a: 0, c: 1 });
  });

  it('restituisce oggetto vuoto se tutte le chiavi sono undefined o stringhe vuote', () => {
    const input = { a: undefined, b: '', c: undefined };
    const result = stripUndefined(input);
    expect(result).toEqual({});
  });

  it('restituisce lo stesso oggetto se non ci sono undefined o stringhe vuote', () => {
    const input = { a: 1, b: 'test', c: null };
    const result = stripUndefined(input);
    expect(result).toEqual({ a: 1, b: 'test', c: null });
  });

  it('gestisce oggetto vuoto', () => {
    const input = {};
    const result = stripUndefined(input);
    expect(result).toEqual({});
  });
});
