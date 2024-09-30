import { CreateMessageUseCaseRequest, CreateMessageUseCaseResponse, Message } from "../use-cases/create-message.use-case";

export interface MessageRepository {
    create(data: CreateMessageUseCaseRequest): Promise<Message>
    findManyByRoomId(room_id: string): Promise<any>

}