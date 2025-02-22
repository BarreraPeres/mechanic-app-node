import { FastifyReply, FastifyRequest } from "fastify";


export function jwtVerifyUserRole(
    roleToVerify: "CLIENT" | "BOSS" | "EMPLOYEE",
    roleSecond?: "CLIENT" | "BOSS" | "EMPLOYEE") {
    return async (request: FastifyRequest, reply: FastifyReply) => {

        await request.jwtVerify()

        const { role } = request.user
        if (role !== roleToVerify && role !== roleSecond) {
            return reply.status(401).send({ message: "Unauthorized" })
        }
    }
}