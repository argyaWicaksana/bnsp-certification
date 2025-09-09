import documentArchiveService from "@/services/documentArchiveService";
import { sendSuccess } from "@/utils/apiResponse";
import { NextFunction, Request, Response } from "express";

const documentArchiveController = {
    getAllDocumentArchives: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const search = req.query.search as string || '';
            const documentArchives = await documentArchiveService.getAllDocumentArchives(page, search);
            sendSuccess(res, documentArchives, "Documents retrieved successfully");
        } catch (error) {
            next(error);
        }
    },
    getDocumentArchiveById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            const documentArchive = await documentArchiveService.getDocumentArchiveById(id);
            sendSuccess(res, documentArchive, "Document retrieved successfully");
        } catch (error) {
            next(error)
        }
    },
    createDocumentArchive: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const file = req.file!;
            const documentInput = req.body;
            const newDocument = await documentArchiveService.createDocumentArchive(documentInput, file);
            sendSuccess(res, newDocument, "Document created successfully", 201);
        } catch (error) {
            next(error)
        }
    },
    updateDocumentArchive: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            const documentInput = req.body;
            const file = req.file;
            const updatedDocument = await documentArchiveService.updateDocumentArchive(id, documentInput, file);
            sendSuccess(res, updatedDocument, "Document updated successfully");
        } catch (error) {
            next(error)
        }
    },
    deleteDocumentArchive: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            const { title } = await documentArchiveService.deleteDocumentArchive(id);
            sendSuccess(res, {}, `Document "${title}" deleted successfully`);
        } catch (error) {
            next(error)
        }
    }
};

export default documentArchiveController;