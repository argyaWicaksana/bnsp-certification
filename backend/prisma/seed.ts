import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seedUsers() {
    const users = [...Array(5)].map(() => (
        {
            username: faker.internet.username(),
            password: bcrypt.hashSync("password", 10)
        }
    ));

    users.push({
        username: 'admin',
        password: bcrypt.hashSync("password", 10)
    });

    await prisma.user.createMany({ data: users })
}

async function seedArhives() {
    const archives = [...Array(11)].map(() => (
        {
            title: faker.lorem.sentence(3),
            letterNo: faker.string.alphanumeric(10).toUpperCase(),
            file: 'uploads/document_archives/Document_1757566325020.pdf',
            categoryId: 1
        }
    ));

    await prisma.documentArchive.createMany({ data: archives })
}

async function seedCategories() {
    const categories = ['Undangan', 'Pengumuman', 'Nota Dinas', 'Pemberitahuan']

    const categoriesData = categories.map(c =>(
        {
            name: c,
            description: `Surat berisi ${c}`
        }
    ));

    await prisma.category.createMany({data: categoriesData});
}

async function main() {
    await seedUsers()
    await seedCategories()
    // await seedArhives()
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});