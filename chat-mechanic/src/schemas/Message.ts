import { Document, Schema } from "mongoose";
import { mongoDbConnect } from "../connection";

export interface IMessage extends Document {
    to: string,
    to_role: "CLIENT" | "BOSS" | "EMPLOYEE",
    text: string
    room_id: string
}

const messageSchema = new Schema({
    to: Schema.Types.ObjectId,
    to_role: {
        type: String,
        enum: ["CLIENT", "BOSS", "EMPLOYEE"]
    },
    text: String,
    room_id: {
        type: String,
        ref: "chat_rooms"
    },
    is_read: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    })

const Message = mongoDbConnect.model<IMessage>("messages", messageSchema)

export { Message }
