
import { prisma } from "../config/prisma"
import { OrderServiceRepository } from "../repositories/order-service-repository";
import { SchedulingRepository } from "../repositories/scheduling-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface responseSchedulingRequest {
    accepted: boolean
    id: string
}

interface responseSchedulingResponse {
    status: string;
}

export class ResponseSchedulingUseCases {
    constructor(
        public schedulingRepository: SchedulingRepository,
        public orderService: OrderServiceRepository
    ) { }
    async execute({ accepted, id }: responseSchedulingRequest): Promise<responseSchedulingResponse> {

        const updateStatus = accepted ? "SCHEDULED" : "REJECTED"

        const scheduleSave = await this.schedulingRepository.save(id, updateStatus)
        if (!scheduleSave) {
            throw new ResourceNotFoundError()
        }

        const orderSave = await this.orderService.save(id, updateStatus)
        if (!orderSave) {
            throw new ResourceNotFoundError()
        }

        return { status: scheduleSave.status }
    }

}