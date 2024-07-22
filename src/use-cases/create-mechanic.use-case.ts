import { Mechanic } from "@prisma/client";
import { MechanicRepository } from "../repositories/mechanic-repository";

interface CreateMechanicRequest {
    latitude: number
    longitude: number
    name: string
    phone: string | null
}

interface CreateMechanicResponse {
    mechanic: Mechanic
}

export class CreateMechanicUseCase {
    constructor(
        public mechanicRepository: MechanicRepository
    ) { }

    async execute({
        latitude,
        longitude,
        name,
        phone,
    }: CreateMechanicRequest): Promise<CreateMechanicResponse> {

        const mechanic = await this.mechanicRepository.create({
            latitude,
            longitude,
            name,
            phone,
        })

        return {
            mechanic
        }
    }
}