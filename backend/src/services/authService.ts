import userRepository from "@/repositories/userRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authService = {
    login: async (username: string, password: string) => {
        const user = await userRepository.findUserByUsername(username);

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if (!passwordIsValid) {
            const error = new Error("Invalid username or password");
            (error as any).status = 401;
            throw error;
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: 86400 // 24 hours
        })


        return { user: user.username, token }
    }
};

export default authService;