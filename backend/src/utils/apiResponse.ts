import { Response } from "express";

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: any;
    test?: string
}

export const sendSuccess = <T>(
    res: Response,
    data: T,
    message = "Success",
    status = 200
) => {
    const response: ApiResponse<T> = {
        success: true,
        data,
        message,
    };
    return res.status(status).json(response);
}

export const sendError = (
    res: Response,
    error: any = null,
    message = "Error",
    status = 500
) => {
    const response: ApiResponse<null> = {
        success: false,
        error,
        message,
    };
    return res.status(status).json(response);
}