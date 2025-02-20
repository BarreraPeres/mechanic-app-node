import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import { env } from "../../../env/index";

export interface isAuthenticatedResponse {
    isAuthenticated: boolean
    role: "CLIENT" | "BOSS" | "EMPLOYEE"
}

export async function isAuthenticated(request: FastifyRequest, reply: FastifyReply): Promise<isAuthenticatedResponse> {

    try {
        const refreshTokenExisting = request.cookies.refreshToken
        if (!refreshTokenExisting) {
            return { isAuthenticated: false, role: "CLIENT" }
        }

        const key = env.JWT_SECRET
        jwt.verify(refreshTokenExisting, key)

        await request.jwtVerify()
        const { role } = request.user

        return reply.status(200).send({ isAuthenticated: true, role })
    } catch (e) {
        return reply.status(400).send({ isAuthenticated: false, role: "CLIENT", error: e })
    }

}