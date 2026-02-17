import { describe, it, expect } from 'vitest';
import { wouldExceedLimit } from './limiti.js';

describe('wouldExceedLimit', () => {
  it('restituisce false quando si è sotto il limite', () => {
    expect(wouldExceedLimit(10, 5, 20)).toBe(false);
  });

  it('restituisce false quando si è esattamente al limite', () => {
    expect(wouldExceedLimit(10, 10, 20)).toBe(false);
  });

  it('restituisce true quando si supererebbe il limite', () => {
    expect(wouldExceedLimit(10, 11, 20)).toBe(true);
  });

  it('restituisce false quando non ci sono copie già fatte e si aggiunge meno del limite', () => {
    expect(wouldExceedLimit(0, 50, 100)).toBe(false);
  });

  it('restituisce false quando non ci sono copie già fatte e si aggiunge esattamente il limite', () => {
    expect(wouldExceedLimit(0, 100, 100)).toBe(false);
  });

  it('restituisce true quando non ci sono copie già fatte e si aggiunge più del limite', () => {
    expect(wouldExceedLimit(0, 101, 100)).toBe(true);
  });

  it('restituisce true quando si aggiunge molto più del limite', () => {
    expect(wouldExceedLimit(5, 100, 20)).toBe(true);
  });

  it('gestisce correttamente il caso limite con zero copie già fatte e limite alto', () => {
    expect(wouldExceedLimit(0, 1, 1000)).toBe(false);
  });
});
