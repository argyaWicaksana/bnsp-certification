import categoryController from '@/controllers/categoryController';
import { validate } from '@/middlewares/validate';
import { categorySchema } from '@/validations/categoryValidation';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router()


router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.post('/', validate(categorySchema), categoryController.createCategory)
router.put('/:id', validate(categorySchema), categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

export default router
