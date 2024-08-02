import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { GetUserProfileUseCase } from "../get-user-profile.use-case";

export function MakeGetUserProfile() {

    const userRepository = new PrismaUserRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(userRepository)

    return getUserProfileUseCase

}