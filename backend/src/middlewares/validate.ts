import { sendError } from "@/utils/apiResponse";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validate = (schemaReqBody: z.ZodObject<any, any>, schemaReqFile?: z.ZodObject<any, any>, fileRequired = false) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schemaReqBody.parse(req.body);

            if (fileRequired && !req.file) {
                throw new Error('File is required');
            }

            if (schemaReqFile && req.file) {
                schemaReqFile.parse(req.file);
            }
            next();
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                error.message = JSON.parse(error.message)
            }
            sendError(res, error.message, 'Data input invalid', 400);
        }
    }
}