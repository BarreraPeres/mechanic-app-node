import { Mechanic } from "@prisma/client"
import { MechanicRepository } from "../repositories/mechanic-repository"

interface FetchNearbyMechanicsRequest {
    userLongitude: number,
    userLatitude: number
}

interface FetchNearbyMechanicsResponse {
    mechanics: Mechanic[]
}

export class FetchNearbyMechanicsUseCase {
    constructor(
        public mechanicRepository: MechanicRepository
    ) { }

    async execute({
        userLatitude, userLongitude
    }: FetchNearbyMechanicsRequest): Promise<FetchNearbyMechanicsResponse> {
        const mechanics = await this.mechanicRepository.findManyNearby(
            { latitude: userLatitude, longitude: userLongitude }
        )
        return {
            mechanics
        }
    }
}