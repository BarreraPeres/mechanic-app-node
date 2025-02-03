import { Scheduling } from "@prisma/client"
import { SchedulingRepository, SchedulingResponseType } from "../repositories/scheduling-repository"



interface FetchSchedulingHistoryRequest {
    userId: string
}

interface FetchSchedulingHistoryRespose {
    schedules: SchedulingResponseType[]
}

export class FetchSchedulingHistoryUseCases {
    constructor(
        public schedulingRepository: SchedulingRepository
    ) { }

    async execute({
        userId
    }: FetchSchedulingHistoryRequest): Promise<FetchSchedulingHistoryRespose> {

        const schedules = await this.schedulingRepository.findManyByUserId(userId)

        return { schedules }
    }
}