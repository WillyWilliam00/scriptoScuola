import { useEffect } from "react";
import { useAuthStore } from "../store/auth-store.js";
import { isTokenExpired } from "../lib/jwt-utils.js";
import { refresh } from "../lib/auth-api.js";

/**
 * Custom hook per gestire l'inizializzazione dell'autenticazione all'avvio
 * 
 * Spiegazione:
 * - Il persist middleware ripristina automaticamente lo stato da localStorage
 * - Quando lo store viene rehydratato, token e refreshToken cambiano da null ai valori reali
 * - Usiamo [token, refreshToken] come dipendenze per attivare il useEffect quando i token sono disponibili
 * - Verifichiamo se il token è scaduto
 * - Se scaduto e abbiamo refresh token valido, chiamiamo refresh in background
 * - Distinguiamo errori di rete da errori di autenticazione per evitare logout inutili
 * 
 * Pattern moderno (2026): Custom hook invece di componente wrapper
 * Vantaggi:
 * - Più idiomatico per React (hooks per side effects)
 * - Nessun wrapper component inutile nel DOM
 * - Più flessibile (puoi restituire stato se necessario)
 * 
 * Uso:
 * ```tsx
 * function App() {
 *   useAuthInitialization(); // Chiamata diretta
 *   return <Routes>...</Routes>;
 * }
 * ```
 */
export function useAuthInitialization() {
  const { token, refreshToken } = useAuthStore();

  useEffect(() => {
    /**
     * Inizializza l'autenticazione all'avvio dell'app
     * 
     * Flusso:
     * 1. Se non ci sono token salvati → esci (utente non autenticato)
     * 2. Se il token è ancora valido → esci (tutto ok)
     * 3. Se il token è scaduto → prova refresh
     * 4. Se refresh fallisce per errore di autenticazione → logout automatico
     * 5. Se refresh fallisce per errore di rete → mantieni stato corrente (non fare logout)
     */
    const initializeAuth = async () => {
      // Se non c'è token, non fare nulla (utente non autenticato o store non ancora rehydratato)
      if (!token || !refreshToken) {
        return;
      }

      // Se il token è ancora valido, non serve fare refresh
      if (!isTokenExpired(token)) {
        return;
      }

      // Token scaduto, prova refresh in background
      try {
        await refresh(refreshToken);
      } catch (error) {
        // Distinguiamo errori di rete da errori di autenticazione
        const isNetworkError = 
          error instanceof Error && (
            error.message.includes('Network Error') ||
            error.message.includes('timeout') ||
            error.message.includes('ECONNREFUSED') ||
            error.message.includes('ERR_NETWORK') ||
            (error as any).code === 'ECONNABORTED' ||
            (error as any).code === 'ERR_NETWORK'
          );
        
        // Se è un errore di rete temporaneo, non fare logout
        // L'utente potrebbe avere token validi ma problemi di connessione
        if (isNetworkError) {
          console.warn('Refresh token fallito per errore di rete, mantengo stato corrente:', error);
          return;
        }

        // Se è un errore di autenticazione (401, 403, refresh token scaduto), fai logout
        console.error('Refresh token fallito per errore di autenticazione:', error);
        useAuthStore.getState().logout();
      }
    };

    initializeAuth();
  }, [token, refreshToken]); 
}
