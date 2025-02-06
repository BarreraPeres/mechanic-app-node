import { Vehicle } from "@prisma/client"
import { VehicleRepository } from "../repositories/vehicle-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface GetVehicleByIdRequest {
    id: string
}

interface GetVehicleByIdResponse {
    vehicle: Vehicle
}

export class GetVehicleByIdUseCase {
    constructor(
        public vehicleRepository: VehicleRepository
    ) { }

    async execute({
        id
    }: GetVehicleByIdRequest): Promise<GetVehicleByIdResponse> {
        const vehicle = await this.vehicleRepository.findById(id)
        if (!vehicle) {
            throw new ResourceNotFoundError()
        }
        return { vehicle }
    }
}