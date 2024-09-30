import { Message } from "../../schemas/Message";
import { CreateMessageUseCaseRequest } from "../../use-cases/create-message.use-case";
import { MessageRepository } from "../message-repository";

export class MongodbMessageRepository implements MessageRepository {
    async create({ room_id, text, to, to_role }: CreateMessageUseCaseRequest) {
        const message = await Message.create({
            room_id,
            text,
            to,
            to_role
        })

        return { message }
    }

    async findManyByRoomId(room_id: string) {
        const messages = await Message.find({
            room_id
        })

        return { messages }
    }

    // async findMechanicNameById(room_id: string) {
    //     const mechanic_name = await Message.findOne({
    //         room_id
    //     }).populate("mechanic_from").exec()

    //     return { mechanic_name }
    // }
    // async findUserNameById(room_id: string) {
    //     const user_name = await Message.findOne({
    //         room_id
    //     }).populate("user_from").exec()

    //     return { user_name }
    // }


}