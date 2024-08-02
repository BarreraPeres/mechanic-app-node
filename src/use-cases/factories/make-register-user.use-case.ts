import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { RegisterUserUseCases } from "../register-user.use-cases";

export function MakeRegisterUserUseCase() {
    const userRepository = new PrismaUserRepository()
    const registerUserUseCases = new RegisterUserUseCases(userRepository)

    return registerUserUseCases
}