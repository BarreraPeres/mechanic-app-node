import { Vehicle } from "@prisma/client"
import { UserRepository } from "../repositories/user-repository"
import { VehicleRepository } from "../repositories/vehicle-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface GetVehiclesRequest {
    user_id: string
}

interface GetVehiclesResponse {
    vehicles: Vehicle[]
}

export class GetVehiclesUseCase {
    constructor(
        public userRepository: UserRepository,
        public vehicleRepository: VehicleRepository
    ) { }

    async execute({
        user_id
    }: GetVehiclesRequest): Promise<GetVehiclesResponse> {
        const userAlreadyExists = await this.userRepository.findById(user_id)
        if (!userAlreadyExists) {
            throw new ResourceNotFoundError()
        }

        const vehicles = await this.vehicleRepository.findManyById(user_id)
        if (!vehicles) {
            throw new ResourceNotFoundError()
        }
        return { vehicles }
    }
}