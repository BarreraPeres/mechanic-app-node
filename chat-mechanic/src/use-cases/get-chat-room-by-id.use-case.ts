import { string } from "zod";
import { ChatRoomRepository } from "../repositories/chat-room-repository";
import { IChatRoom } from "../schemas/ChatRoom";

interface GetChatRoomByIdUseCaseRequest {
    chat_room_id: string
    role: "CLIENT" | "EMPLOYEE" | "BOSS"
}

interface GetChatRoomByIdUseCaseResponse {
    chatRoom: {
        _id: String,
        id_user: {
            _id: String,
            external_id: string,
            email: string,
            name: string,
            role: string,
            socket_id: string,
        },
        id_mechanic: {
            _id: String,
            external_id: string,
            email: string,
            name: string,
            role: string,
            socket_id: string,
        },
        external_id: string,
        email: string,
        name: string,
        role: string,
        id_mechanic_workshop: String
        id_chat_room: string
    }
}


export class GetChatRoomByIdUseCase {
    constructor(private chatRoomRepository: ChatRoomRepository) { }

    async handle({ chat_room_id, role }: GetChatRoomByIdUseCaseRequest): Promise<GetChatRoomByIdUseCaseResponse> {
        const chatRoom = await this.chatRoomRepository.findById(chat_room_id, role)

        return chatRoom
    }
}