import { Document, Schema } from "mongoose";
import { mongoDbConnect } from "../connection";

export interface IMechanic extends Document {
    _id: String
    external_id: string
    name: string
    role: string
    email: string
    socket_id?: string
    avatar?: string
}

const mechanicSchema = new Schema({
    external_id: String,
    email: String,
    name: String,
    role: String,
    socket_id: String,
    avatar: String,
})


const Mechanic = mongoDbConnect.model<IMechanic>("mechanics", mechanicSchema)

export { Mechanic }