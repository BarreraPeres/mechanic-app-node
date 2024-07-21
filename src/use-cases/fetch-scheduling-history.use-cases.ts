import { Scheduling } from "@prisma/client"
import { SchedulingRepository } from "../repositories/scheduling-repository"



interface FetchSchedulingHistoryRequest {
    userId: string
}

interface FetchSchedulingHistoryRespose {
    schedules: Scheduling[]
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