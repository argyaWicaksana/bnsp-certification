import categoryController from '@/controllers/categoryController';
import { validate } from '@/middlewares/validate';
import { categorySchema } from '@/validations/categoryValidation';
import { Router, Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/middlewares/auth';

const router = Router()

router.get('/', verifyToken, categoryController.getAllCategories)
router.get('/last-id', verifyToken, categoryController.getLastId)
router.get('/:id', verifyToken, categoryController.getCategoryById)
router.post('/', verifyToken, validate(categorySchema), categoryController.createCategory)
router.put('/:id', verifyToken, validate(categorySchema), categoryController.updateCategory)
router.delete('/:id', verifyToken, categoryController.deleteCategory)

export default router
