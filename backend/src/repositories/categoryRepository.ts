import { CategoryData } from "@/validations/categoryValidation";
import prisma from "../db/prisma";

const categoryRepository = {
    findAll: async (page = 1, search = '') => {
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        return await prisma.category.findMany({
            where: {
                name: { contains: search, mode: 'insensitive' },
                description: { contains: search, mode: 'insensitive' },
            },
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        });
    },
    findById: async (id: number) => {
        return await prisma.category.findUnique({
            where: { id },
        });
    },
    create: async (data: CategoryData) => {
        return await prisma.category.create({
            data,
        });
    },
    update: async (id: number, data: CategoryData) => {
        return await prisma.category.update({
            where: { id },
            data,
        });
    },
    delete: async (id: number) => {
        return await prisma.category.delete({
            where: { id },
        });
    }
};

export default categoryRepository;