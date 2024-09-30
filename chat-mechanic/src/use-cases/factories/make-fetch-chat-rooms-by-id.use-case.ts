import { MongodbChatRoomRepository } from "../../repositories/mongobd/mongodb-chat-room-repository";
import { FetchChatRoomsByIdUseCase } from "../fetch-chat-rooms-by-id.use-case";

export function MakeFetchChatRoomsByIdUseCase() {
    const chatRoomRepository = new MongodbChatRoomRepository()
    const fetchChatRoomsByIdUseCase = new FetchChatRoomsByIdUseCase(chatRoomRepository)
    return fetchChatRoomsByIdUseCase
}