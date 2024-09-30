import { MongodbChatRoomRepository } from "../../repositories/mongobd/mongodb-chat-room-repository"
import { MongodbMechanicWorkshopRepository } from "../../repositories/mongobd/mongodb-mechanic-workshop-repository"
import { CreateChatRoomUseCase } from "../create-chat-room.use-case"

export function MakeCreateChatRoomUseCase() {

    const chatRoomRepository = new MongodbChatRoomRepository()
    const mongodbMechanicWorkshopRepository = new MongodbMechanicWorkshopRepository()
    const createChatRoomUseCase = new CreateChatRoomUseCase(chatRoomRepository, mongodbMechanicWorkshopRepository)
    return createChatRoomUseCase
}