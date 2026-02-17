 import express from 'express';
import { asyncHandler, requireRole } from '../middleware/auth.js';
import type { Request, Response } from 'express';
import { docentiQuerySchema, idParamSchema, insertDocenteSchema, type DocentiQuery, type InsertDocente } from '../../../shared/validation.js';

const router = express.Router();

/**
 * GET /api/docenti
 * Ottiene la lista paginata dei docenti con filtri e ordinamento
 */
router.get('/', asyncHandler(async (req: Request, res: Response) => {
    if (!req.tenantStore) {
        return res.status(500).json({ error: 'Store non inizializzato' });
    }

    const query = docentiQuerySchema.parse(req.query);
    const result = await req.tenantStore.docenti.getPaginated(query);
    
    res.status(200).json(result);
}));

/**
 * POST /api/docenti
 * Crea un nuovo docente (solo admin)
 */
router.post('/new-docente', requireRole('admin'), asyncHandler(async (req: Request, res: Response) => {
    if (!req.tenantStore) {
        return res.status(500).json({ error: 'Store non inizializzato' });
    }

    const data = insertDocenteSchema.omit({ istitutoId: true }).parse(req.body);
    const nuovoDocente = await req.tenantStore.docenti.create(data);
    
    res.status(201).json({
        message: 'Docente creato con successo',
        data: nuovoDocente,
    });
}));

/**
 * PUT /api/docenti/:id
 * Aggiorna un docente esistente (solo admin)
 */
router.put('/update-docente/:id', requireRole('admin'), asyncHandler(async (req: Request, res: Response) => {
    if (!req.tenantStore) {
        return res.status(500).json({ error: 'Store non inizializzato' });
    }

    // Valida e converte l'ID usando Zod
    const { id } = idParamSchema.parse(req.params);

    const data = insertDocenteSchema.omit({ istitutoId: true }).parse(req.body);
    const docenteAggiornato = await req.tenantStore.docenti.update(id, data);
    
    res.status(200).json({
        message: 'Docente aggiornato con successo',
        data: docenteAggiornato,
    });
}));

/**
 * DELETE /api/docenti/:id
 * Elimina un docente (solo admin)
 */
router.delete('/delete-docente/:id', requireRole('admin'), asyncHandler(async (req: Request, res: Response) => {
    if (!req.tenantStore) {
        return res.status(500).json({ error: 'Store non inizializzato' });
    }

    // Valida e converte l'ID usando Zod
    const { id } = idParamSchema.parse(req.params);

    const idEliminato = await req.tenantStore.docenti.delete(id);
    
    res.status(200).json({
        message: 'Docente eliminato con successo',
        id: idEliminato,
    });
}));

export default router;
