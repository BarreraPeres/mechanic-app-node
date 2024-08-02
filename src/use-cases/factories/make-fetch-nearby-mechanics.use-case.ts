import { PrismaMechanicRepository } from "../../repositories/prisma/prisma-mechanic-repository";
import { FetchNearbyMechanicsUseCase } from "../fetch-nearby-mechanics.use-case";

export function MakeFetchNearbyMechanicsUseCase() {
    const mechanicRepository = new PrismaMechanicRepository()
    const fetchNearbyMechanicsUseCase = new FetchNearbyMechanicsUseCase(mechanicRepository)

    return fetchNearbyMechanicsUseCase
}