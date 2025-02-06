import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import { env } from "../../../env/index";

export async function verifyCookieExisting(request: FastifyRequest, reply: FastifyReply): Promise<boolean> {

    try {
        const refreshTokenExisting = request.cookies.refreshToken
        if (!refreshTokenExisting) {
            return false
        }

        const key = env.JWT_SECRET
        jwt.verify(refreshTokenExisting, key)

        return reply.status(200).send(true)
    } catch (e) {
        console.log(e)
        return reply.status(400).send(false)
    }

}