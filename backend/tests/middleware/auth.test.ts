import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { requireRole, errorHandler, type ErrorWithStatus } from '../../src/middleware/auth.js';
import { ZodError, z } from 'zod';

describe('requireRole', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
  });

  it('restituisce 401 se req.user non è presente', () => {
    requireRole('admin')(mockReq as Request, mockRes as Response, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Non autenticato' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('restituisce 403 se ruolo utente non è in roles (admin richiesto, utente collaboratore)', () => {
    mockReq.user = { userId: '1', ruolo: 'collaboratore', istitutoId: 1 };
    requireRole('admin')(mockReq as Request, mockRes as Response, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Non hai i permessi per questa operazione' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('restituisce 403 se ruolo utente non è in roles (collaboratore richiesto, utente admin)', () => {
    mockReq.user = { userId: '1', ruolo: 'admin', istitutoId: 1 };
    requireRole('collaboratore')(mockReq as Request, mockRes as Response, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Non hai i permessi per questa operazione' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('chiama next() se ruolo utente è in roles (admin richiesto, utente admin)', () => {
    mockReq.user = { userId: '1', ruolo: 'admin', istitutoId: 1 };
    requireRole('admin')(mockReq as Request, mockRes as Response, mockNext);
    
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('chiama next() se ruolo utente è in roles (collaboratore richiesto, utente collaboratore)', () => {
    mockReq.user = { userId: '1', ruolo: 'collaboratore', istitutoId: 1 };
    requireRole('collaboratore')(mockReq as Request, mockRes as Response, mockNext);
    
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('chiama next() se ruolo utente è in roles multipli (admin o collaboratore richiesti, utente admin)', () => {
    mockReq.user = { userId: '1', ruolo: 'admin', istitutoId: 1 };
    requireRole('admin', 'collaboratore')(mockReq as Request, mockRes as Response, mockNext);
    
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('chiama next() se ruolo utente è in roles multipli (admin o collaboratore richiesti, utente collaboratore)', () => {
    mockReq.user = { userId: '1', ruolo: 'collaboratore', istitutoId: 1 };
    requireRole('admin', 'collaboratore')(mockReq as Request, mockRes as Response, mockNext);
    
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });
});

describe('errorHandler', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
    consoleErrorSpy.mockClear();
  });

  it('gestisce ZodError con status 400 e details', () => {
    // Creiamo un ZodError reale usando uno schema che fallisce
    const schema = z.object({ nome: z.string() });
    let zodError: ZodError;
    try {
      schema.parse({ nome: 123 }); // Questo fallirà e genererà un ZodError
      // Se arriviamo qui, il test fallisce perché doveva lanciare un errore
      expect.fail('Expected ZodError to be thrown');
    } catch (error) {
      zodError = error as ZodError;
    }

    errorHandler(zodError, mockReq as Request, mockRes as Response, mockNext);

    expect(consoleErrorSpy).toHaveBeenCalledWith(zodError);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Dati di input non validi',
      details: zodError.issues,
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('gestisce Error con status personalizzato (404)', () => {
    const error: ErrorWithStatus = new Error('Risorsa non trovata');
    error.status = 404;

    errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Risorsa non trovata' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('gestisce Error senza status (default 500)', () => {
    const error = new Error('Errore generico');

    errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Errore generico' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('gestisce Error senza message (default message)', () => {
    const error = new Error();
    error.message = '';

    errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Qualcosa è andato storto!' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('gestisce Error con status 401', () => {
    const error: ErrorWithStatus = new Error('Non autorizzato');
    error.status = 401;

    errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Non autorizzato' });
  });
});

