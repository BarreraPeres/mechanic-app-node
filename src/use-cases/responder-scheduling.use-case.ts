import { OrderServiceRepository } from "../repositories/order-service-repository";
import { SchedulingRepository } from "../repositories/scheduling-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface responderSchedulingRequest {
    accepted: boolean
    id: string
}

interface responderSchedulingResponse {
    status: string;
}

export class ResponderSchedulingUseCases {
    constructor(
        public schedulingRepository: SchedulingRepository,
        public orderService: OrderServiceRepository
    ) { }
    async execute({ accepted, id }: responderSchedulingRequest): Promise<responderSchedulingResponse> {

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