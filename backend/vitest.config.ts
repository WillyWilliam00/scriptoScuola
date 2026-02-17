import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Imposta NODE_ENV=test per tutti i test
    env: {
      NODE_ENV: 'test',
    },
    // Timeout per i test di integrazione (possono essere più lenti)
    testTimeout: 10000,
    // Pattern per i file di test
    include: ['**/*.test.ts', '**/*.integration.test.ts'],
    // Disabilita il parallelismo per i test di integrazione
    // I test di integrazione condividono lo stesso database e devono essere eseguiti in sequenza
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true, // Esegue tutti i test in sequenza su un singolo processo
      },
    },
  },
});
