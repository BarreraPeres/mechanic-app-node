import { MechanicRepository } from "../repositories/mechanic-repository"
import { IMechanic } from "../schemas/Mechanic"


export interface RegisterMechanicUseCaseIntegrationRequest {
    external_id: string,
    email: string,
    name: string,
    role: string,
}

export interface RegisterMechanicUseCaseIntegrationResponse {
    mechanic: IMechanic
}

export class RegisterMechanicUseCaseIntegration {
    constructor(
        private mechanicRepository: MechanicRepository
    ) { }

    async handle({
        email,
        external_id,
        name,
        role
    }: RegisterMechanicUseCaseIntegrationRequest): Promise<RegisterMechanicUseCaseIntegrationResponse | undefined> {

        const mechanicExisting = await this.mechanicRepository.findByEmail(email)

        if (mechanicExisting) {
            return
        }

        const mechanic = this.mechanicRepository.create({ email, external_id, name, role })

        return mechanic
    }
}