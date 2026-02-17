import type { Request, Response, NextFunction } from 'express';
import { createTenantStore } from '../db/tenantStore.js';
import { db } from '../db/index.js';

// Estraiamo il tipo di ritorno di createTenantStore usando un helper
type TenantStore = ReturnType<typeof createTenantStore>;

// Estendiamo l'interfaccia Request di Express per includere lo store
declare global {
    namespace Express {
        interface Request {
            tenantStore?: TenantStore;
        }
    }
}

/**
 * Middleware che aggiunge lo store del tenant alla request
 * Lo store viene creato usando l'istitutoId dell'utente autenticato
 * Questo middleware deve essere usato DOPO authMiddleware
 */
export function tenantStoreMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        res.status(401).json({ error: 'Non autenticato' });
        return;
    }

    // Creiamo lo store usando l'istitutoId dell'utente autenticato
    req.tenantStore = createTenantStore(req.user.istitutoId, db);
    next();
}
