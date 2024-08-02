import { PrismaOrderServiceRepository } from "../../repositories/prisma/prisma-order-service-repository";
import { FetchVehicleOrderServicesHistoryUseCase } from "../fetch-vehicle-order-services.use-case";

export function MakeFetchVehicleOrderServiceUseCase() {
    const orderServiceRepository = new PrismaOrderServiceRepository()
    const fetchVehicleOrderServiceHistoryUseCase = new FetchVehicleOrderServicesHistoryUseCase(orderServiceRepository)

    return fetchVehicleOrderServiceHistoryUseCase
}