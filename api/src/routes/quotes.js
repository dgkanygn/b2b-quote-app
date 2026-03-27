import { Router } from 'express';
import { create, getAll, getUserQuotes, getById, updateStatus } from '../controllers/quoteController.js';
import { authenticateToken, optionalAuth, requireAdmin, requireCustomer } from '../middleware/auth.js';

const router = Router();

router.post('/', optionalAuth, create);
router.get('/', authenticateToken, requireAdmin, getAll);
router.get('/user', authenticateToken, requireCustomer, getUserQuotes);
router.get('/:id', authenticateToken, getById);
router.put('/:id/status', authenticateToken, requireAdmin, updateStatus);

export default router;
