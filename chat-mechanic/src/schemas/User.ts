import { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";
import { mongoDbConnect } from "../connection";


export interface IUser extends Document {
    _id: String
    external_id: string
    name: string
    role: string
    email: string
    socket_id?: string
    avatar?: string
}


const userSchema = new Schema({
    external_id: String,
    email: String,
    name: String,
    role: String,
    socket_id: String,
    avatar: String,
})

const User = mongoDbConnect.model<IUser>("users", userSchema)

export { User }