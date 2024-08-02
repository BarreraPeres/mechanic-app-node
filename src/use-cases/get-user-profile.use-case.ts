import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileRequest {
    userId: string
}

interface GetUserProfileResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(
        public userRepository: UserRepository
    ) { }

    async execute({
        userId
    }: GetUserProfileRequest): Promise<GetUserProfileResponse> {

        const user = await this.userRepository.findById(userId)
        if (!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user
        }

    }
}