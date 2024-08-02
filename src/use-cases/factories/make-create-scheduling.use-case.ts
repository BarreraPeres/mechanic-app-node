import { PrismaMechanicRepository } from "../../repositories/prisma/prisma-mechanic-repository";
import { PrismaSchedulingRepository } from "../../repositories/prisma/prisma-scheduling-repository";
import { PrismaVehicleRepository } from "../../repositories/prisma/prisma-vehicle-repository";
import { CreateSchedulingUseCase } from "../create-scheduling.use-case";

export function MakeCreateSchedulingUseCase() {
    const schedulingRepository = new PrismaSchedulingRepository()
    const vehicleRepository = new PrismaVehicleRepository()
    const mechanicRepository = new PrismaMechanicRepository()
    const createSchedulingUseCase = new CreateSchedulingUseCase(schedulingRepository, vehicleRepository, mechanicRepository)

    return createSchedulingUseCase
}