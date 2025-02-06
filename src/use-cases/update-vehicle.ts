import { Prisma } from "@prisma/client"
import { VehicleRepository } from "../repositories/vehicle-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface UpdateVehiclesRequest {
    vehicle_id: string
    brand?: string,
    model?: string,
    year?: number,
    plate?: string,
}

interface UpdateVehiclesResponse {
    vehicle: Prisma.VehicleUpdateInput
}

export class UpdateVehiclesUseCase {
    constructor(
        public vehicleRepository: VehicleRepository
    ) { }

    async execute({
        vehicle_id,
        brand,
        model,
        year,
        plate,
    }: UpdateVehiclesRequest): Promise<UpdateVehiclesResponse> {

        const vehicleOld = await this.vehicleRepository.findById(vehicle_id)
        if (!vehicleOld) {
            throw new ResourceNotFoundError()
        }
        const vehicleObj = {
            id: vehicle_id,
            user_id: vehicleOld.user_id,
            brand,
            model,
            year,
            plate,
        }
        const vehicle = await this.vehicleRepository.update(vehicleObj)


        return { vehicle }
    }
}


