import { MechanicRepository } from "../repositories/mechanic-repository"

interface GetMechanicLoggedUseCaseRequest {
    mechanic_external_id: string
}

export class GetMechanicLoggedUseCase {
    constructor(private mechanicRepository: MechanicRepository) { }

    async handle({ mechanic_external_id }: GetMechanicLoggedUseCaseRequest): Promise<any> {
        const mechanic = await this.mechanicRepository.findByExternalId(mechanic_external_id)

        return { mechanic }
    }
}