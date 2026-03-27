import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { authenticateToken, requireCustomer } from '../middleware/auth.js';

const router = Router();

router.get('/profile', authenticateToken, requireCustomer, getProfile);
router.put('/profile', authenticateToken, requireCustomer, updateProfile);

export default router;
