import { PrismaVehicleRepository } from "../../repositories/prisma/prisma-vehicle-repository";
import { GetVehicleByIdUseCase } from "../get-vehicle-by-id";

export function MakeGetVehicleByIdUseCase() {
    const vehicleRepository = new PrismaVehicleRepository()
    const gtVehicleByIdUseCase = new GetVehicleByIdUseCase(vehicleRepository)

    return gtVehicleByIdUseCase
}