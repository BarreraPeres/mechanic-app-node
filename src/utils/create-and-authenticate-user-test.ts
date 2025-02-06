import { FastifyInstance } from "fastify";
import request from "supertest"
import { prisma } from "../config/prisma";
import bcrjs from "bcryptjs"
const { hash } = bcrjs

interface CreateAndAuthenticateUserTestResponse {
    accessToken: string,
    refreshToken: string[]
}

export async function CreateAndAuthenticateUserTest(app: FastifyInstance, role: "CLIENT" | "BOSS" | "EMPLOYEE"): Promise<CreateAndAuthenticateUserTestResponse> {

    await prisma.user.create({
        data: {
            name: "esperança",
            password_hash: await hash("123456", 6),
            cpf: "123456",
            email: "esperanca@gmail.com",
            role: role
        }
    })
    const authenticateUser = await request(app.server)
        .post("/login")
        .send({
            password: "123456",
            username: "esperanca@gmail.com"
        })

    const refreshToken = authenticateUser.get("Set-Cookie")

    if (!refreshToken) {
        throw new Error("Refresh token not found")
    }

    const { accessToken } = authenticateUser.body

    return { accessToken, refreshToken }
}