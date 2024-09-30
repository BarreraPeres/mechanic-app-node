import { ChatRoomRepository } from "../repositories/chat-room-repository"
import { IChatRoom } from "../schemas/ChatRoom"
import { MechanicWorkshopRepository } from "../repositories/mechanic-workshop-repository"

export interface CreateChatRoomUseCaseRequest {
    id_user: string
    id_mechanic_workshop: string
    id_mechanic: string
}
export interface CreateChatRoomUseCaseResponse {
    chatRoom: IChatRoom
}


export class CreateChatRoomUseCase {
    constructor(
        private chatRoomRepository: ChatRoomRepository,
        private mechanicWorkshopRepository: MechanicWorkshopRepository
    ) { }

    async handle({
        id_mechanic_workshop,
        id_user,
        id_mechanic
    }: CreateChatRoomUseCaseRequest): Promise<CreateChatRoomUseCaseResponse | null> {

        // const mechanicWorkshop = await this.mechanicWorkshopRepository.findByExtenalId(id_mechanic_workshop)
        // if (!mechanicWorkshop) {
        //     return null
        // }
        const chatRoomAlreadyExists = await this.chatRoomRepository.findByUsersId(id_mechanic_workshop, id_user)

        if (chatRoomAlreadyExists) {
            const chatRoom = chatRoomAlreadyExists
            return chatRoom
        }

        const chatRoom = await this.chatRoomRepository.create({
            id_mechanic_workshop, id_user, id_mechanic
        })

        return chatRoom
    }
}