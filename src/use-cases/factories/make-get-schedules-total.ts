import { PrismaSchedulingRepository } from "../../repositories/prisma/prisma-scheduling-repository";
import { GetSchedulesTotalUseCases } from "../get-schedules-total";

export function MakeGetSchedulesTotalUseCase() {
    const schedulingRepository = new PrismaSchedulingRepository()
    const getSchedulesTotalUseCase = new GetSchedulesTotalUseCases(schedulingRepository)

    return getSchedulesTotalUseCase
}