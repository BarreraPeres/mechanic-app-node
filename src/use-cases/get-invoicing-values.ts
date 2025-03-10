
import { OrderServiceRepository } from "../repositories/order-service-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface GetInvoicingRequest {
    mechanicId: string
}
interface GetInvoicingResponse {
    sum: number
}

export class GetInvoicingValuesUseCases {
    constructor(
        public orderServiceRepository: OrderServiceRepository
    ) { }

    async execute({
        mechanicId
    }: GetInvoicingRequest): Promise<GetInvoicingResponse> {

        const sum = await this.orderServiceRepository.getInvoicing(mechanicId)

        if (!sum) {
            throw new ResourceNotFoundError()
        }

        return sum
    }
}

