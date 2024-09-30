import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import { MechanicWorkshop } from "../schemas/MechanicWorkshop";
import { ChatRoom } from "../schemas/ChatRoom";
import { Message } from "../schemas/Message";
import { Mechanic } from "../schemas/Mechanic";
import { User } from "../schemas/User";


export async function fetchRooms(request: FastifyRequest, reply: FastifyReply) {

    const authToken = request.cookies.refreshToken

    if (!authToken) {
        return reply.status(404).send({ message: 'Token não encontrado!!!!' });
    }

    const key = "password-super-secret"
    const decoded = jwt.verify(authToken, key)
    const external_id = decoded.sub

    const mechanic = await Mechanic.findOne({
        external_id
    })

    if (!mechanic) {
        return reply.status(404).send({ message: 'Token não encontrado' });
    }

    const chatRooms = await ChatRoom.find({
        id_mechanic: mechanic._id
    }).populate("id_mechanic_workshop").exec()

    if (!chatRooms) {
        return reply.status(404).send({ message: 'Token não encontrado' });
    }

    const messages = await Promise.all(chatRooms.flatMap(async room => {
        return Message.find({ room_id: room.id_chat_room, is_read: false }).populate("to")
    }))

    const flatMessages = messages.flat();

    if (flatMessages.length === 0) {
        return reply.status(404).send({ message: 'Nenhuma mensagem não lida encontrada' });
    }

    const user = await User.findOne({
        _id: flatMessages[0].to
    })

    return reply.status(201).send({
        messages, user
    })

}
