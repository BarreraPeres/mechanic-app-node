import { User } from "@prisma/client";
import { UserRepository, UserWithMechanics } from "../repositories/user-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetMechanicsRequest {
    userId: string
}

interface GetMechanicsResponse {
    user: UserWithMechanics
}

export class GetMechanicsUseCase {
    constructor(public userRepository: UserRepository) { }
    async execute({
        userId
    }: GetMechanicsRequest): Promise<GetMechanicsResponse> {
        const user = await this.userRepository.findMechanicsByUserId(userId)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user
        }

    }
}