import { OrderService } from "@prisma/client"
import { OrderServiceRepository, OrderServiceWithVehicle } from "../repositories/order-service-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface FetchOrderServiceRequest {
    mechanicId: string
    status?: string
    page: number
}

interface FetchOrderServiceRespose {
    orderServices: OrderServiceWithVehicle[]
}

export class FetchOrderServiceUseCases {
    constructor(
        public OrderServiceRepository: OrderServiceRepository
    ) { }

    async execute({
        mechanicId,
        status,
        page
    }: FetchOrderServiceRequest): Promise<FetchOrderServiceRespose> {
        if (!page) {
            page = 0
        }

        const orderServices = await this.OrderServiceRepository.findManyByMechanicId(mechanicId, page, status)

        if (!orderServices) {
            throw new ResourceNotFoundError()
        }

        return { orderServices }
    }
}