import { Router } from 'express';
import { getAll, getCategories, getById, create, update, remove, uploadImages } from '../controllers/productController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

// Public
router.get('/', getAll);
router.get('/categories', getCategories);
router.get('/:id', getById);

// Admin only
router.post('/', authenticateToken, requireAdmin, create);
router.put('/:id', authenticateToken, requireAdmin, update);
router.delete('/:id', authenticateToken, requireAdmin, remove);
router.post('/:id/images', authenticateToken, requireAdmin, upload.array('images', 10), uploadImages);

export default router;
