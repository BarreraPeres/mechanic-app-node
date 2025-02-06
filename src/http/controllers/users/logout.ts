import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function logout(request: FastifyRequest, reply: FastifyReply) {


    try {
        const token = request.user
        if (!token) { return reply.status(404).send({ message: "Token not found" }) }

        const refreshToken = await reply.jwtSign(
            {
                role: token.role,
            },
            {
                sign: {
                    sub: token.sub,
                    expiresIn: "1s"
                }
            }
        )

        const yesterday = new Date('04/12/2022 00:00:00');
        return reply.setCookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: true,
            expires: yesterday
        }).send({ message: "Logout successful" })

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }


}