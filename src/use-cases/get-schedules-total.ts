import { SchedulingRepository, SchedulingResponseType } from "../repositories/scheduling-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface GetSchedulesTotalRequest {
    userId: string
}


export interface GetSchedulesTotalResponse {
    total: number
}

export class GetSchedulesTotalUseCases {
    constructor(
        public schedulingRepository: SchedulingRepository
    ) { }

    async execute({
        userId,
    }: GetSchedulesTotalRequest): Promise<GetSchedulesTotalResponse> {

        const total = await this.schedulingRepository.getSchedulesTotalToday(userId)

        if (!total) {
            throw new ResourceNotFoundError()
        }


        return total
    }
}