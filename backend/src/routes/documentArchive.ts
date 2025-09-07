import documentArchiveController from '@/controllers/documentArchiveController';
import { verifyToken } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import { documentArchiveSchema, pdfFileSchema } from '@/validations/documentArchiveValidation';
import { Router } from 'express';
import multer from 'multer';

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/', verifyToken, documentArchiveController.getAllDocumentArchives)
router.get('/:id', verifyToken, documentArchiveController.getDocumentArchiveById)
router.post('/', verifyToken, upload.single("file"), validate(documentArchiveSchema, pdfFileSchema, true), documentArchiveController.createDocumentArchive)
router.put('/:id', verifyToken, upload.single("file"), validate(documentArchiveSchema, pdfFileSchema), documentArchiveController.updateDocumentArchive)
router.delete('/:id', verifyToken, documentArchiveController.deleteDocumentArchive)

export default router