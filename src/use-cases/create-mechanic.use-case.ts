import { Mechanic } from "@prisma/client";
import { MechanicRepository } from "../repositories/mechanic-repository";
import { UserRepository } from "../repositories/user-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreateMechanicRequest {
    latitude: number
    longitude: number
    name: string
    phone: string | null
    id_user: string
}

interface CreateMechanicResponse {
    mechanic: Mechanic
}

export class CreateMechanicUseCase {
    constructor(
        public mechanicRepository: MechanicRepository,
        public userRepository: UserRepository
    ) { }

    async execute({
        id_user,
        latitude,
        longitude,
        name,
        phone,

    }: CreateMechanicRequest): Promise<CreateMechanicResponse> {
        const employee = await this.userRepository.findById(id_user)
        if (!employee) {
            throw new ResourceNotFoundError()
        }

        const mechanic = await this.mechanicRepository.create({
            employees: {
                connect: {
                    id: employee.id
                }
            },
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