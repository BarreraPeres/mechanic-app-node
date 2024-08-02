import { PrismaSchedulingRepository } from "../../repositories/prisma/prisma-scheduling-repository";
import { FetchSchedulingHistoryUseCases } from "../fetch-scheduling-history.use-cases";

export function MakeFetchSchedulingHistoryUseCase() {
    const schedulingRepository = new PrismaSchedulingRepository()
    const fetchSchedulingHistoryUseCase = new FetchSchedulingHistoryUseCases(schedulingRepository)

    return fetchSchedulingHistoryUseCase
}