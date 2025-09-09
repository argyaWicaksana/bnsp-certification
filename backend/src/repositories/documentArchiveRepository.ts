import prisma from "@/db/prisma";
import { DocumentArchiveData } from "@/validations/documentArchiveValidation";

const documentArchiveRepository = {
    findAll: async (page = 1, search = '') => {
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        return await prisma.documentArchive.findMany({
            select: {
                id: true,
                title: true,
                letterNo: true,
                file: true,
                category: {
                    select: { name: true }
                },
                createdAt: true,
            },
            ...(search ? {
                where: {
                    title: { contains: search, mode: 'insensitive' },
                },
            } : {}),
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        });
    },
    findById: async (id: number) => {
        return await prisma.documentArchive.findUnique({
            where: { id },
        });
    },
    create: async (data: DocumentArchiveData) => {
        return await prisma.documentArchive.create({
            data,
        });
    },
    update: async (id: number, data: DocumentArchiveData) => {
        const { file, ...rest } = data;
        return await prisma.documentArchive.update({
            where: { id },
            data: {
                ...rest,
                ...(file ? { file } : {})
            },
        });
    },
    delete: async (id: number) => {
        return await prisma.documentArchive.delete({
            where: { id },
        });
    },
    countAll: async (search = '') => {
        return await prisma.documentArchive.count({
            ...(search ? {
                where: {
                    title: { contains: search, mode: 'insensitive' },
                },
            } : {}),
        });
    }
};

export default documentArchiveRepository;
