import { PrismaMechanicRepository } from "../../repositories/prisma/prisma-mechanic-repository"
import { SearchMechanicUseCase } from "../search-mechanics.use-case"

export function MakeSearchMechanicUseCase() {
    const mechanicRepository = new PrismaMechanicRepository()
    const searchMechanicUseCase = new SearchMechanicUseCase(mechanicRepository)

    return searchMechanicUseCase
}