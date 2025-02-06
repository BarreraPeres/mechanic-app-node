import { PrismaVehicleRepository } from "../../repositories/prisma/prisma-vehicle-repository";
import { UpdateVehiclesUseCase } from "../update-vehicle";

export function MakeUpdateVehicleUseCase() {
    const vehicleRepository = new PrismaVehicleRepository()
    const updateVehiclesUseCase = new UpdateVehiclesUseCase(vehicleRepository)
    return updateVehiclesUseCase
}