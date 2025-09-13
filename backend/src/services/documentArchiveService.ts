import documentArchiveRepository from "@/repositories/documentArchiveRepository";
import { DocumentArchiveData } from "@/validations/documentArchiveValidation";
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(__dirname, '../../public');
const UPLOAD_DIR = path.join(PUBLIC_DIR, 'uploads/document_archives');

const documentArchiveService = {
    getAllDocumentArchives: async (page = 1, search = '') => {
        const data = await documentArchiveRepository.findAll(page, search);
        const total = await documentArchiveRepository.countAll(search);

        return { data, total };
    },
    getDocumentArchiveById: async (id: number) => {
        const documentArchive = await documentArchiveRepository.findById(id);
        if (!documentArchive) {
            let err: any = new Error('Document Archive not found');
            err.status = 404;
            throw err;
        }
        return documentArchive;
    },
    createDocumentArchive: async (data: Omit<DocumentArchiveData, "file">, file: Express.Multer.File) => {
        const fileSaveName = `Document_${Date.now()}.pdf`;
        const fullPath = path.join(UPLOAD_DIR, fileSaveName);

        try {
            // create directory if not exists
            if (!fs.existsSync(UPLOAD_DIR)) {
                fs.mkdirSync(UPLOAD_DIR, { recursive: true });
            }

            fs.writeFileSync(fullPath, file.buffer);

            const filePath = path.join('uploads/document_archives', fileSaveName).replace(/\\/g, "/");
            const dataDTO = { ...data, file: filePath };

            return await documentArchiveRepository.create(dataDTO);
        } catch (error) {
            // delete the file if error occurs
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }

            throw error;
        }

    },
    updateDocumentArchive: async (id: number, data: Partial<Omit<DocumentArchiveData, "file">>, file?: Express.Multer.File) => {
        let fullPath = '';

        try {
            const dataDTO = { ...data, file: '' };
            if (file) {
                const fileSaveName = `Document_${Date.now()}.pdf`;
                fullPath = path.join(UPLOAD_DIR, fileSaveName);

                // create directory if not exists
                if (!fs.existsSync(UPLOAD_DIR)) {
                    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
                }

                // save new file
                fs.writeFileSync(fullPath, file.buffer);

                // delete old file
                const existing = await documentArchiveRepository.findById(id);
                if (!existing) throw new Error('Document Archive not found');
                const oldFilePath = path.join(PUBLIC_DIR, existing.file);
                fs.unlinkSync(oldFilePath);

                const filePath = path.join('uploads/document_archives', fileSaveName).replace(/\\/g, "/");
                dataDTO.file = filePath;
            }

            return await documentArchiveRepository.update(id, dataDTO);
        } catch (error) {
            // delete the new file if error occurs
            if (file && fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }

            throw error;
        }
    },
    deleteDocumentArchive: async (id: number) => {
        const existing = await documentArchiveRepository.findById(id);
        if (!existing) {
            let err: any = new Error('Document Archive not found');
            err.status = 404;
            throw err;
        }

        // delete the file
        const filePath = path.join(PUBLIC_DIR, existing.file);
        console.log(fs.existsSync(filePath));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await documentArchiveRepository.delete(id);

        return existing;
    }
}

export default documentArchiveService;
