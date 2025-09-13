import { CategoryData } from "@/validations/categoryValidation";
import prisma from "../db/prisma";

const categoryRepository = {
    findAll: async (page = 0, search = '') => {
        let pageSize = 10;
        let skip = (page - 1) * pageSize;

        return await prisma.category.findMany({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ]
            },
            ...(page === 0 ? {} : { skip, take: pageSize }),
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
    },
    countAll: async (search = '') => {
        return await prisma.category.count({
            ...(search ? {
                where: {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } }
                    ]
                },
            } : {}),
        });
    },
    getLastId: async () => {
        return await prisma.category.findFirst({
            select: {
                id: true
            },
            orderBy: {
                id: 'desc',
            },
        });
    }
};

export default categoryRepository;