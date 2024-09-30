import { MongodbMechanicRepository } from "../../repositories/mongobd/mongodb-mechanic-repository"
import { MongodbUserRepository } from "../../repositories/mongobd/mongodb-user-repository"
import { GetUserFromTokenUseCase } from "../get-user-from-token.use-case"

export function MakeGetUserFromTokenUseCase() {
    const userRepository = new MongodbUserRepository()
    const mechanicRepository = new MongodbMechanicRepository()
    const getUserFromTokenUseCase = new GetUserFromTokenUseCase(userRepository, mechanicRepository)
    return getUserFromTokenUseCase
}