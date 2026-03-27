import { Router } from 'express';
import { login, logout, getMe } from '../controllers/adminController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateToken, requireAdmin, getMe);

export default router;
