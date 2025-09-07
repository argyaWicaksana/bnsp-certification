import authService from "@/services/authService";
import { sendSuccess } from "@/utils/apiResponse";
import { NextFunction, Request, Response } from "express";

const authController = {
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            const { user, token } = await authService.login(username, password)

            sendSuccess(res, { user, token }, "Login successful");
        } catch (error) {
            next(error);
        }
    }
}

export default authController;