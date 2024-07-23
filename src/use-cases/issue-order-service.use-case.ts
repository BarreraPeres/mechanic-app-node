
import { OrderService } from "@prisma/client"
import { OrderServiceRepository } from "../repositories/order-service-repository"
import { SchedulingRepository } from "../repositories/scheduling-repository"
import { TimeNotAvailebleOrderServicesError } from "./errors/time-not-avalieble-order-services-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { ScheduleAlreadyOrderIssuedError } from "./errors/schedule-already-order-issued-error"
import dayjs from "dayjs"


interface IssueRequest {
    value: number
    description: string | null
    scheduling_id: string
    start_date: Date
    end_date: Date
    mechanic_id?: string | null
}
interface IssueResponse {
    orderService: OrderService
}

export class IssueServiceUseCases {
    constructor(
        public issueServiceRepository: OrderServiceRepository,
        public schedulingRepository: SchedulingRepository
    ) { }

    async checkAvailability(start_date: Date, end_date: Date): Promise<boolean> {
        const orderServices = await this.issueServiceRepository.findByDate(start_date, end_date);
        return orderServices.length === 0;
    }

    async execute({
        description,
        scheduling_id,
        mechanic_id,
        end_date,
        start_date,
        value
    }: IssueRequest): Promise<IssueResponse> {
        const scheduling = await this.schedulingRepository.findUniqueById(scheduling_id)
        if (!scheduling) {
            throw new ResourceNotFoundError()
        }

        const isAvailable = await this.checkAvailability(start_date, end_date)
        if (!isAvailable) {
            throw new TimeNotAvailebleOrderServicesError();
        }


        const schedulingIdAlreadyIssued = await this.issueServiceRepository.findSchedulingExisting(scheduling_id)
        if (schedulingIdAlreadyIssued) {
            throw new ScheduleAlreadyOrderIssuedError()
        }

        const startDate = dayjs(start_date).startOf("date")
        const endDate = dayjs(end_date).startOf("date")
        if (endDate.isBefore(startDate)) {
            throw new TimeNotAvailebleOrderServicesError()
        }

        const orderService = await this.issueServiceRepository.create({
            value,
            mechanic_id: scheduling.mechanic_id,
            vehicle_id: scheduling.vehicle_id,
            description,
            scheduling_id,
            start_date,//: startDate,
            end_date//: endDate
        })


        return { orderService }

    }
}

