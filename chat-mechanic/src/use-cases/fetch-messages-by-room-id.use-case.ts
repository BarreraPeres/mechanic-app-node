import { ChatRoomRepository } from "../repositories/chat-room-repository";
import { MessageRepository } from "../repositories/message-repository";

interface FetchMessagesAndNamesByRoomIdUseCaseRequest {
    room_id: string,
    role: "CLIENT" | "EMPLOYEE" | "BOSS"
}

export class FetchMessagesAndNamesByRoomIdUseCase {
    constructor(
        private messageRepository: MessageRepository,
        private chatRoomRepository: ChatRoomRepository,
    ) { }
    async handle({ room_id, role }: FetchMessagesAndNamesByRoomIdUseCaseRequest): Promise<any> {

        const { messages } = await this.messageRepository.findManyByRoomId(room_id)

        if (!messages) {
            return null
        }
        //role: messages.messages[0].to_role
        const { chatRoom } = await this.chatRoomRepository.findById(room_id, role)

        let user = ''
        role === "CLIENT" ? user = chatRoom.id_user : user = chatRoom.id_mechanic

        return {
            messages, user
        }
    }
}


// names: {
//     mechanic: mechanic_name.mechanic_from.name,
//     user: user_name.user_from.name
// },
// _id: {
//     mechanic_id: mechanic_name.mechanic_from._id,
//     user_id: user_name.user_from._id
// },

// socket_id: {
//     mechanic_id: mechanic_name.mechanic_from.socket_id,
//     user_id: user_name.user_from.socket_id
// },