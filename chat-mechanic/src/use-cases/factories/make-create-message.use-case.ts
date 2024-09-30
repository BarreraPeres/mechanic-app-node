import { MongodbMessageRepository } from "../../repositories/mongobd/mongodb-message-repository"
import { CreateMessageUseCase } from "../create-message.use-case"

export function MakeCreateMessageUseCase() {
    const mongodbMessageRepository = new MongodbMessageRepository()
    const createMessageUseCase = new CreateMessageUseCase(mongodbMessageRepository)
    return createMessageUseCase
}