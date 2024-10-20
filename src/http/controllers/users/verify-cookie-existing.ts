import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyCookieExisting(request: FastifyRequest, reply: FastifyReply): Promise<boolean> {

    const refreshTokenExisting = request.cookies.refreshToken

    if (!refreshTokenExisting) {
        return false
    }

    return reply.status(200).send(true)
}