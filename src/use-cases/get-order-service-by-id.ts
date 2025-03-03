import { OrderService } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OrderServiceRepository } from "../repositories/order-service-repository";

interface GetOrderServiceByIdRequest {
    orderServiceId: string
}

interface GetOrderServiceByIdResponse {
    orderService: OrderService
}

export class GetOrderServiceByIdUseCase {
    constructor(
        public orderService: OrderServiceRepository
    ) { }

    async execute({
        orderServiceId
    }: GetOrderServiceByIdRequest): Promise<GetOrderServiceByIdResponse> {

        const orderService = await this.orderService.findById(orderServiceId)
        if (!orderService) {
            throw new ResourceNotFoundError()
        }

        return {
            orderService
        }

    }
}