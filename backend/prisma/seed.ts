import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    const users = [...Array(10)].map(() => (
        {
            username: faker.internet.username(),
            password: bcrypt.hashSync("password", 10)
        }
    ));

    await prisma.user.createMany({ data: users})
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});