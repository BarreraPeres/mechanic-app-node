import { ChatRoomRepository } from "../repositories/chat-room-repository";


interface FetchChatRoomsByIdUserRequest {
    id_user: string
}

interface FetchChatRoomsByIdMechanicRequest {
    id_mechanic: string
}



export class FetchChatRoomsByIdUseCase {
    constructor(private chatRoomRepository: ChatRoomRepository) { }

    async handleUser({ id_user }: FetchChatRoomsByIdUserRequest): Promise<any> {
        const { chatRooms } = await this.chatRoomRepository.findManyByIdUser(id_user)

        return { chatRooms }
    }

    async handleMechanic({ id_mechanic }: FetchChatRoomsByIdMechanicRequest): Promise<any> {

        const chatRooms = await this.chatRoomRepository.findManyByIdMechanic(id_mechanic)

        return { chatRooms }
    }
}