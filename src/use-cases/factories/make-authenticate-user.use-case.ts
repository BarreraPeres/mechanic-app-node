import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { AuthenticateUserUseCase } from "../authenticate-user.use-case";

export function MakeAuthenticateUserCase() {
    const userRepository = new PrismaUserRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)
    return authenticateUserUseCase
}