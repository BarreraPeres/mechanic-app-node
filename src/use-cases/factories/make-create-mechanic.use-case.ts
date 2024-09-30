import { PrismaMechanicRepository } from "../../repositories/prisma/prisma-mechanic-repository";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { CreateMechanicUseCase } from "../create-mechanic.use-case";

export function MakeCreateMechanicUseCase() {
    const mechanicRepository = new PrismaMechanicRepository()
    const userRepository = new PrismaUserRepository()
    const createMechanicUseCase = new CreateMechanicUseCase(mechanicRepository, userRepository)

    return createMechanicUseCase
}