import { MongodbChatRoomRepository } from "../../repositories/mongobd/mongodb-chat-room-repository"
import { MongodbMessageRepository } from "../../repositories/mongobd/mongodb-message-repository"
import { FetchMessagesAndNamesByRoomIdUseCase } from "../fetch-messages-by-room-id.use-case"

export function MakeFetchMessagesAndNamesByRoomIdUseCase() {
    const messageRepository = new MongodbMessageRepository()
    const chatRoomRepository = new MongodbChatRoomRepository()
    const fetchMessagesAndNamesByRoomIdUseCase = new FetchMessagesAndNamesByRoomIdUseCase(messageRepository, chatRoomRepository)
    return fetchMessagesAndNamesByRoomIdUseCase
}
