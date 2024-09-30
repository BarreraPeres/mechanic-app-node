import { MongodbChatRoomRepository } from "../../repositories/mongobd/mongodb-chat-room-repository"
import { GetChatRoomByIdUseCase } from "../get-chat-room-by-id.use-case"

export function MakeGetChatRoomByIdUseCase() {
    const mongodbChatRoomRepository = new MongodbChatRoomRepository()
    const getChatRoomByIdUseCase = new GetChatRoomByIdUseCase(mongodbChatRoomRepository)
    return getChatRoomByIdUseCase


}