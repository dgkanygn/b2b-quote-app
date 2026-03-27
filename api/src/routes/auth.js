import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import { authenticateToken, requireCustomer } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateToken, requireCustomer, getMe);

export default router;
