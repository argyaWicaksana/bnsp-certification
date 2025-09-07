import categoryRepository from "@/repositories/categoryRepository";
import { CategoryData } from "@/validations/categoryValidation";

const categoryService = {
    getAllCategories: async (page = 1, search = '') => {
        return await categoryRepository.findAll(page, search);
    },
    getCategoryById: async (id: number) => {
        const category = await categoryRepository.findById(id);
        if (!category) {
            let err: any = new Error('Category not found');
            err.status = 404;
            throw err;
        }
        return category;
    },
    createCategory: async (data: CategoryData) => {
        return await categoryRepository.create(data);
    },
    updateCategory: async (id: number, data: CategoryData) => {
        return await categoryRepository.update(id, data);
    },
    deleteCategory: async (id: number) => {
        return await categoryRepository.delete(id);
    }
}

export default categoryService;