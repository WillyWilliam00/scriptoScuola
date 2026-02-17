import { describe, it, expect } from 'vitest';
import { extractBearerToken } from '../../../src/db/utils/extractBearerToken.js';

describe('extractBearerToken', () => {
  it('restituisce null se authorization è undefined', () => {
    expect(extractBearerToken(undefined)).toBeNull();
  });

  it('restituisce null se authorization è null', () => {
    expect(extractBearerToken(null as any)).toBeNull();
  });

  it('restituisce null se authorization non inizia con Bearer', () => {
    expect(extractBearerToken('Basic 1234567890')).toBeNull();
  });

  it('restituisce null se authorization è solo "Bearer " senza token', () => {
    expect(extractBearerToken('Bearer ')).toBeNull();
  });

  it('restituisce null se authorization è "Bearer" senza spazio', () => {
    expect(extractBearerToken('Bearer')).toBeNull();
  });

  it('restituisce il token se authorization inizia con Bearer', () => {
    expect(extractBearerToken('Bearer 1234567890')).toBe('1234567890');
  });

  it('rimuove spazi extra dal token', () => {
    expect(extractBearerToken('Bearer  1234567890  ')).toBe('1234567890');
  });

  it('gestisce token con caratteri speciali', () => {
    const token = 'abc.def.ghi';
    expect(extractBearerToken(`Bearer ${token}`)).toBe(token);
  });
});

