import { PrismaOrderServiceRepository } from "../../repositories/prisma/prisma-order-service-repository";
import { GetInvoicingValuesUseCases } from "../get-invoicing-values";

export function MakeGetInvoicingValuesUseCase() {
    const orderServiceRepository = new PrismaOrderServiceRepository()
    const getInvoicingUseCase = new GetInvoicingValuesUseCases(orderServiceRepository)
    return getInvoicingUseCase
}