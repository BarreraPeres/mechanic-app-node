import { Vehicle } from "@prisma/client";
import { VehicleRepository } from "../repositories/vehicle-repository";
import { VehicleAlreadyRegisteredError } from "./errors/vehicle-already-registered-error";

interface RegisterVehicleRequest {
    plate: string
    model: string
    year: number
    user_id: string
}

interface RegisterVehicleResponse {
    vehicle: Vehicle
}

export class RegisterVehicleUseCase {
    constructor(
        public vehicleRepository: VehicleRepository
    ) { }

    async execute({
        model,
        plate,
        user_id,
        year
    }: RegisterVehicleRequest): Promise<RegisterVehicleResponse> {

        const VehicleRegistered = await this.vehicleRepository.findByPlate(plate)
        if (VehicleRegistered) {
            throw new VehicleAlreadyRegisteredError()
        }

        const vehicle = await this.vehicleRepository.create({
            model,
            plate,
            user_id,
            year
        })

        return { vehicle }
    }
}