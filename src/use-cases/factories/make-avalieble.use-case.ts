import { PrismaMechanicRepository } from "../../repositories/prisma/prisma-mechanic-repository";
import { PrismaOrderServiceRepository } from "../../repositories/prisma/prisma-order-service-repository";
import { AvaliebleUseCase } from "../avalieble-times-mechanic.use-case";

export function MakeAvaliebleUseCase() {
    const mechanicRepository = new PrismaMechanicRepository()
    const orderServiceRepository = new PrismaOrderServiceRepository
    const avaliebleUseCase = new AvaliebleUseCase(mechanicRepository, orderServiceRepository)

    return avaliebleUseCase
}