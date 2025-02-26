import { $Enums } from "@prisma/client"
import { SchedulingRepository, SchedulingResponseType } from "../repositories/scheduling-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface FetchSchedulingHistoryRequest {
    userId: string,
    status?: $Enums.Status,
    page: number
}

interface FetchSchedulingHistoryRespose {
    schedules: SchedulingResponseType[]
}

export class FetchSchedulingHistoryUseCases {
    constructor(
        public schedulingRepository: SchedulingRepository
    ) { }

    async execute({
        userId,
        page,
        status
    }: FetchSchedulingHistoryRequest): Promise<FetchSchedulingHistoryRespose> {
        if (!page) {
            page = 0
        }
        const schedules = await this.schedulingRepository.findManyByUserId(userId, page, status)

        if (!schedules) {
            throw new ResourceNotFoundError()
        }

        return { schedules }
    }
}