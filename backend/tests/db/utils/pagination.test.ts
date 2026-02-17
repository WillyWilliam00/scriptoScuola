import { describe, it, expect } from 'vitest';
import { buildPagination } from '../../../src/db/utils/pagination.js';

describe('buildPagination', () => {
  it('calcola correttamente con totalItems = 0 (pagina vuota)', () => {
    const result = buildPagination(1, 20, 0);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(20);
    expect(result.totalItems).toBe(0);
    expect(result.totalPages).toBe(1); // Pagina vuota: "pagina 1 di 1" invece di "pagina 1 di 0"
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(false);
  });

  it('calcola correttamente prima pagina con più pagine disponibili', () => {
    const result = buildPagination(1, 20, 25);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(20);
    expect(result.totalItems).toBe(25);
    expect(result.totalPages).toBe(2);
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPreviousPage).toBe(false);
  });

  it('calcola correttamente ultima pagina con più pagine disponibili', () => {
    const result = buildPagination(2, 20, 25);
    expect(result.page).toBe(2);
    expect(result.pageSize).toBe(20);
    expect(result.totalItems).toBe(25);
    expect(result.totalPages).toBe(2);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(true);
  });

  it('calcola correttamente quando totalItems è esattamente uguale a pageSize', () => {
    const result = buildPagination(1, 20, 20);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(20);
    expect(result.totalItems).toBe(20);
    expect(result.totalPages).toBe(1);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(false);
  });

  it('calcola correttamente pagina centrale con molte pagine', () => {
    const result = buildPagination(3, 10, 50);
    expect(result.page).toBe(3);
    expect(result.pageSize).toBe(10);
    expect(result.totalItems).toBe(50);
    expect(result.totalPages).toBe(5);
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPreviousPage).toBe(true);
  });

  it('calcola correttamente ultima pagina quando totalItems non è multiplo di pageSize', () => {
    const result = buildPagination(3, 10, 25);
    expect(result.page).toBe(3);
    expect(result.pageSize).toBe(10);
    expect(result.totalItems).toBe(25);
    expect(result.totalPages).toBe(3);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(true);
  });
});

