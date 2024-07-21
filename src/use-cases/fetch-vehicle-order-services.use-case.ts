import { OrderService } from "@prisma/client"
import { OrderServiceRepository } from "../repositories/order-service-repository"


interface FetchVehicleOrderServicesHistoryRequest {
    vehicleId: string
    page: number
}

interface FetchVehicleOrderServicesHistoryResponse {
    orderServices: OrderService[]
}

export class FetchVehicleOrderServicesHistoryUseCase {
    constructor(public orderServiceRepository: OrderServiceRepository) { }

    async execute({
        vehicleId,
        page
    }: FetchVehicleOrderServicesHistoryRequest): Promise<FetchVehicleOrderServicesHistoryResponse> {

        const orderServices = await this.orderServiceRepository.findManyByVehicleId(vehicleId, page)

        return { orderServices }

    }
} 