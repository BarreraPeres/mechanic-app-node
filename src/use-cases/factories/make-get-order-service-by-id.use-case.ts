import { PrismaOrderServiceRepository } from "../../repositories/prisma/prisma-order-service-repository";
import { GetOrderServiceByIdUseCase } from "../get-order-service-by-id";

export function MakeGetOrderServiceByIdUseCase() {
    const orderServiceRepository = new PrismaOrderServiceRepository()
    const getOrderServiceByIdUseCase = new GetOrderServiceByIdUseCase(orderServiceRepository)
    return getOrderServiceByIdUseCase
}