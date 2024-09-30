import { MongodbMechanicRepository } from "../../repositories/mongobd/mongodb-mechanic-repository";
import { MongodbUserRepository } from "../../repositories/mongobd/mongodb-user-repository";
import { GetUserByIdUseCase } from "../get-user-by-id.use-case";

export function MakeGetUserByIdUseCase() {
    const userRepository = new MongodbUserRepository()
    const mechanicRepository = new MongodbMechanicRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository, mechanicRepository)
    return getUserByIdUseCase
}