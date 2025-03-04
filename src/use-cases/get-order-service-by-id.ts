import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OrderServiceRepository, OrderServiceWithVehicleAndMechanic } from "../repositories/order-service-repository";

interface GetOrderServiceByIdRequest {
    orderServiceId: string
}

interface GetOrderServiceByIdResponse {
    orderService: OrderServiceWithVehicleAndMechanic
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