import { Document, } from "mongoose";
import { randomUUID } from "node:crypto";
import { Schema } from "mongoose";
import { mongoDbConnect } from "../connection";

export interface IChatRoom extends Document {
    _id: Schema.Types.ObjectId,
    id_user: string
    id_mechanic_workshop: string
    id_chat_room: string
    id_mechanic: string
}

const chatRoomSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    id_mechanic: {
        type: Schema.Types.ObjectId,
        ref: "mechanics"
    },

    id_mechanic_workshop: {
        type: Schema.Types.ObjectId,
        ref: "mechanicWorkshops"
    },

    id_chat_room: {
        type: String,
        default: randomUUID
    }
})

const ChatRoom = mongoDbConnect.model<IChatRoom>("chat_rooms", chatRoomSchema)

export { ChatRoom }