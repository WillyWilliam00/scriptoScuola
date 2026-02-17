import { describe, it, expect } from 'vitest';
import { isEmailIdentifier } from '../db/utils/auth.js';

describe('isEmailIdentifier', () => {
  it('restituisce true per email valida', () => {
    expect(isEmailIdentifier('admin@scuola.it')).toBe(true);
  });

  it('restituisce true per email con dominio complesso', () => {
    expect(isEmailIdentifier('user@example.co.uk')).toBe(true);
  });

  it('restituisce true per email con caratteri speciali prima di @', () => {
    expect(isEmailIdentifier('mario.rossi@scuola.it')).toBe(true);
  });

  it('restituisce true per email con solo @ (caso limite)', () => {
    expect(isEmailIdentifier('a@b')).toBe(true);
  });

  it('restituisce false per username senza @', () => {
    expect(isEmailIdentifier('mariorossi')).toBe(false);
  });

  it('restituisce false per username con caratteri speciali', () => {
    expect(isEmailIdentifier('mario.rossi')).toBe(false);
  });

  it('restituisce false per stringa vuota', () => {
    expect(isEmailIdentifier('')).toBe(false);
  });

  it('restituisce false per username con numeri', () => {
    expect(isEmailIdentifier('mario123')).toBe(false);
  });

  it('restituisce false per username con underscore', () => {
    expect(isEmailIdentifier('mario_rossi')).toBe(false);
  });

  it('restituisce true anche se @ è all\'inizio (caso limite)', () => {
    expect(isEmailIdentifier('@username')).toBe(true);
  });

  it('restituisce true anche se @ è alla fine (caso limite)', () => {
    expect(isEmailIdentifier('username@')).toBe(true);
  });
});
