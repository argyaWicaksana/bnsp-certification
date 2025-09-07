import documentArchiveController from '@/controllers/documentArchiveController';
import { validate } from '@/middlewares/validate';
import { documentArchiveSchema, pdfFileSchema } from '@/validations/documentArchiveValidation';
import { Router } from 'express';
import multer from 'multer';

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/', documentArchiveController.getAllDocumentArchives)
router.get('/:id', documentArchiveController.getDocumentArchiveById)
router.post('/', upload.single("file"), validate(documentArchiveSchema, pdfFileSchema, true), documentArchiveController.createDocumentArchive)
router.put('/:id', upload.single("file"), validate(documentArchiveSchema, pdfFileSchema), documentArchiveController.updateDocumentArchive)
router.delete('/:id', documentArchiveController.deleteDocumentArchive)

export default router