import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from '../../../shared/types.js';
import { ZodError } from 'zod';


export const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}



declare global {
    namespace Express {
        interface Request {
            user: JwtPayload;
        }
    }
}

export interface ErrorWithStatus extends Error {
    status?: number;
}

export const JWT_SECRET = process.env.JWT_SECRET!

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token) {
        res.status(401).json({ error: 'Token mancante' });
        return
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = payload;
        next()
    } catch(error) {
        res.status(401).json({ error: 'Token non valido o scaduto' });
        return
    }
}

export function requireRole(...roles: Array<'admin' | 'collaboratore'>) {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user) {
            res.status(401).json({ error: 'Non autenticato' });
            return
        }
        if(!roles.includes(req.user.ruolo)) {
            res.status(403).json({ error: 'Non hai i permessi per questa operazione' });
            return // ⚠️ IMPORTANTE: ferma l'esecuzione se non ha i permessi
        }
        next()
    }
}

export function errorHandler(err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    if(err instanceof ZodError) {
        return res.status(400).json({
            error: 'Dati di input non validi',
            details: err.issues
        })
    }
    const statusCode = err.status || 500;
    const message = err.message || 'Qualcosa è andato storto!';
    return res.status(statusCode).json({ error: message });
}
