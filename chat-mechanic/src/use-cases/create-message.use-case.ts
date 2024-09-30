import { MessageRepository } from "../repositories/message-repository"
import { IMessage } from "../schemas/Message"

export interface CreateMessageUseCaseRequest {
    to: string
    to_role: "CLIENT" | "BOSS" | "EMPLOYEE",
    text: string
    room_id: string
}

export interface CreateMessageUseCaseResponse {
    message: Message
}

export type Message = Record<
    string, {
        to: string
        to_role: "CLIENT" | "BOSS" | "EMPLOYEE"
        text: string
        room_id: string
    }>

export class CreateMessageUseCase {
    constructor(
        private messageRepository: MessageRepository
    ) { }

    async handle({
        room_id,
        text,
        to,
        to_role }: CreateMessageUseCaseRequest): Promise<CreateMessageUseCaseResponse> {

        const message = await this.messageRepository.create({ room_id, text, to, to_role })


        return { message }
    }

}