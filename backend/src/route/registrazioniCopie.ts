import express from 'express';
import { asyncHandler } from '../middleware/auth.js';
import type { Request, Response } from 'express';
import { registrazioniCopieQuerySchema } from '../../../shared/validation.js';
const router = express.Router();


router.get('/', asyncHandler(async (req: Request, res: Response) => {
    if(!req.tenantStore) {
        return res.status(500).json({ error: 'Store non inizializzato' });
    }
    const query = registrazioniCopieQuerySchema.parse(req.query);
    const result = await req.tenantStore.registrazioniCopie.getPaginated(query);
    res.status(200).json(result);
}))

export default router;