import { ChatRoom } from "../../schemas/ChatRoom";
import { CreateChatRoomUseCaseRequest } from "../../use-cases/create-chat-room.use-case";
import { ChatRoomRepository } from "../chat-room-repository";

export class MongodbChatRoomRepository implements ChatRoomRepository {
    async create({ id_mechanic_workshop, id_user, id_mechanic }: CreateChatRoomUseCaseRequest) {

        const chatRoom = await ChatRoom.create({
            id_mechanic_workshop, id_user, id_mechanic
        })
        return { chatRoom }
    }

    async findByUsersId(id_mechanic_workshop: string, id_user: string) {
        const chatRoom = await ChatRoom.findOne({
            $and: [
                { id_mechanic_workshop },
                { id_user }
            ]
        }).exec()

        if (!chatRoom) {
            return null
        }

        return { chatRoom }
    }

    async findById(id_chat_room: string, role: "CLIENT" | "EMPLOYEE" | "BOSS") {
        let chatRoom


        role === "CLIENT" ?
            chatRoom = await ChatRoom.findOne({
                id_chat_room
            }).populate("id_user").exec() :
            chatRoom = await ChatRoom.findOne({
                id_chat_room
            }).populate("id_mechanic").exec() //id_mechanic_workshop

        if (!chatRoom) {
            return null
        }
        return { chatRoom }
    }

    async findManyByIdUser(id_user: string): Promise<any> {
        const chatRooms = await ChatRoom.find({
            id_user
        })
            .populate("id_mechanic", "name")
            .populate("id_mechanic_workshop", "name")
            .exec()


        return { chatRooms };
    }
    async findManyByIdMechanic(id_mechanic: string): Promise<any> {
        const chatRooms = await ChatRoom.find({
            id_mechanic
        })

        return {
            chatRooms
        }
    }


}
