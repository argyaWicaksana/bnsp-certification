import prisma from "@/db/prisma";
import { sendError } from "@/utils/apiResponse";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        const err = new Error('Unauthorized - token not provided');
        (err as any).status = 401;
        throw err;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decode) => {
        try {

            if (err) {
                const error = new Error('Forbidden - token invalid');
                (error as any).status = 403;
                throw error;
            }

            const user = await prisma.user.findUnique({ where: { id: (decode as any).id } })
            if (!user) {
                const error: any = new Error('User not found');
                error.status = 404;
                throw error;
            }
            req.userId = user.id
            next();
        } catch (error: any) {
            sendError(res, error.message, 'Authentication failed', error.status || 500);
        }
    });
};
