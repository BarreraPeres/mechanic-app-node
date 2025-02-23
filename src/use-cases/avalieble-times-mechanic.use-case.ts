import dayjs from "dayjs"
import { MechanicRepository } from "../repositories/mechanic-repository"
import { OrderServiceRepository } from "../repositories/order-service-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface AvaliebleRequest {
    mechanicId: string
    page: number
}

interface AvaliebleResponse {
    avaliebleTimes: string[]
}

export class AvaliebleUseCase {
    constructor(
        public mechanicRepository: MechanicRepository,
        public orderServiceRepository: OrderServiceRepository
    ) { }

    async execute({
        mechanicId,
        page
    }: AvaliebleRequest): Promise<AvaliebleResponse> {
        page
        if (!page) {
            page = 0
        }
        const mechanic = await this.mechanicRepository.findById(mechanicId)
        if (!mechanic) {
            throw new ResourceNotFoundError()
        }
        const orderService = await this.orderServiceRepository.findManyByMechanicId(mechanicId, page)
        if (!orderService) {
            throw new ResourceNotFoundError()
        }

        const allPossibleTimes = [
            "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
            "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
            "16:00", "16:30", "17:00", "17:30"
        ]

        const occupiedTimes = orderService.flatMap(service => {
            let startDate = dayjs(service.start_date)
            const endDate = dayjs(service.end_date)
            const times = []

            while (startDate.isBefore(endDate)) {
                times.push(startDate.format("HH:mm"))
                startDate = startDate.add(30, "minutes")
            }

            return times
        })
        const avaliebleTimes = allPossibleTimes.filter(time => !occupiedTimes.includes(time))
        return { avaliebleTimes }

    }

}