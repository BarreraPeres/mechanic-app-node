import { Mechanic } from "@prisma/client"
import { MechanicRepository } from "../repositories/mechanic-repository"

interface SearchMechanicRequest {
    query: string
    page: number
}

interface SearchMechanicResponse {
    mechanics: Mechanic[]
}

export class SearchMechanicUseCase {
    constructor(
        public mechanicRepository: MechanicRepository
    ) { }

    async execute({
        query,
        page
    }: SearchMechanicRequest): Promise<SearchMechanicResponse> {
        const mechanics = await this.mechanicRepository.searchMany(query, page)

        return {
            mechanics
        }
    }
}