import { PrismaOrderServiceRepository } from "../../repositories/prisma/prisma-order-service-repository";
import { PrismaSchedulingRepository } from "../../repositories/prisma/prisma-scheduling-repository";
import { ResponderSchedulingUseCases } from "../responder-scheduling.use-case";

export function MakeResponderSchedulingUseCase() {
    const orderServiceRepository = new PrismaOrderServiceRepository()
    const schedulingRepository = new PrismaSchedulingRepository()
    const responderSchedulingUseCase = new ResponderSchedulingUseCases(schedulingRepository, orderServiceRepository)

    return responderSchedulingUseCase
}