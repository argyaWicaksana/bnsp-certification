import categoryService from "@/services/categoryService";
import { sendSuccess } from "@/utils/apiResponse";
import { NextFunction, Request, Response } from "express";

const categoryController = {
    getAllCategories: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const search = req.query.search as string || '';

            const categories = await categoryService.getAllCategories(page, search);
            sendSuccess(res, categories, "Categories retrieved successfully");
        } catch (error) {
            next(error);
        }
    },
    getCategoryById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            const category = await categoryService.getCategoryById(id);
            sendSuccess(res, category, "Category retrieved successfully");
        } catch (error) {
            next(error);
        }
    },
    createCategory: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description } = req.body;
            const newCategory = await categoryService.createCategory({ name, description });
            sendSuccess(res, newCategory, "Category created successfully", 201);
        } catch (error) {
            next(error);
        }
    },
    updateCategory: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            const { name, description } = req.body;
            const updatedCategory = await categoryService.updateCategory(id, { name, description });
            sendSuccess(res, updatedCategory, "Category updated successfully");
        } catch (error) {
            next(error);
        }
    },
    deleteCategory: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            const { name: categoryName } = await categoryService.deleteCategory(id);
            sendSuccess(res, {}, `Category "${categoryName}" deleted successfully`);
        } catch (error) {
            next(error);
        }
    }
}

export default categoryController;

