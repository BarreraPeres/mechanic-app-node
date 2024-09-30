import { CreateChatRoomUseCaseRequest, CreateChatRoomUseCaseResponse } from "../use-cases/create-chat-room.use-case";

export interface ChatRoomRepository {
    create(data: CreateChatRoomUseCaseRequest): Promise<CreateChatRoomUseCaseResponse>
    findByUsersId(id_mechanic_workshop: string, id_user: string): Promise<CreateChatRoomUseCaseResponse | null>
    findById(id_chat_room: string, role: "CLIENT" | "EMPLOYEE" | "BOSS"): Promise<any>
    findManyByIdUser(id_user: string): Promise<any>
    findManyByIdMechanic(id_mechanic: string): Promise<any>
}