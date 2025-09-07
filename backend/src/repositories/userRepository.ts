import prisma from "@/db/prisma"

const userRepository = {
    findUserByUsername: async (username: string) => {
        return await prisma.user.findFirstOrThrow({
            where: { username }
        }).catch((error) =>{
            if (error.code === 'P2025') {
                const notFoundError = new Error("Invalid username or password");
                (notFoundError as any).status = 401;
                throw notFoundError;
            }
            throw error;
        });
    }
};

export default userRepository;