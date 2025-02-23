import { PrismaOrderServiceRepository } from "../../repositories/prisma/prisma-order-service-repository";
import { FetchOrderServiceUseCases } from "../fetch-order-services";


export function MakeFetchOrderServiceUseCase() {
    const orderServiceRepository = new PrismaOrderServiceRepository()
    const fetchOrderServiceUseCase = new FetchOrderServiceUseCases(orderServiceRepository)

    return fetchOrderServiceUseCase
}