import { PrismaOrderServiceRepository } from "../../repositories/prisma/prisma-order-service-repository";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { PrismaVehicleRepository } from "../../repositories/prisma/prisma-vehicle-repository";
import { FetchVehicleOrderServicesHistoryUseCase } from "../fetch-vehicle-order-services.use-case";
import { GetVehiclesUseCase } from "../get-vehicles.use-case";

export function MakeGetVehiclesUseCase() {
    const vehicleRepository = new PrismaVehicleRepository()
    const userRepository = new PrismaUserRepository()
    const getVehiclesUseCase = new GetVehiclesUseCase(userRepository, vehicleRepository)

    return getVehiclesUseCase
}