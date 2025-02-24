import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { GetMechanicsUseCase } from "../get-mechanics";

export function MakeGetMechanicsUseCase() {
    const userRepository = new PrismaUserRepository()
    const getMechanicsUseCase = new GetMechanicsUseCase(userRepository)
    return getMechanicsUseCase
}