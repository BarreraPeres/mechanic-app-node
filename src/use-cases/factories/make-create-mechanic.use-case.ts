import { PrismaMechanicRepository } from "../../repositories/prisma/prisma-mechanic-repository";
import { CreateMechanicUseCase } from "../create-mechanic.use-case";

export function MakeCreateMechanicUseCase() {
    const mechanicRepository = new PrismaMechanicRepository()
    const createMechanicUseCase = new CreateMechanicUseCase(mechanicRepository)

    return createMechanicUseCase
}