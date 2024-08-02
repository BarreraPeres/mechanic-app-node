import { PrismaVehicleRepository } from "../../repositories/prisma/prisma-vehicle-repository";
import { RegisterVehicleUseCase } from "../register-vehicle.use-case";

export function MakeRegisterVehicleUseCase() {
    const vehicleRepository = new PrismaVehicleRepository()
    const registerVehicleUseCase = new RegisterVehicleUseCase(vehicleRepository)
    return registerVehicleUseCase
}