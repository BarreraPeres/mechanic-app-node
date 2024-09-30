import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';

export async function getUserIdFromCookie(request: FastifyRequest, reply: FastifyReply) {

    const authToken = request.cookies.refreshToken


    if (!authToken) {
        return reply.status(401).send({ message: 'Token não encontrado' });
    }

    try {
        const key = "password-super-secret"
        const decoded = jwt.verify(authToken, key)
        const user = decoded


        return { user }
    } catch (e) {
        return reply.status(401).send({ message: 'Token inválido' });
    }

}
