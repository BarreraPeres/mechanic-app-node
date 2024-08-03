import { FastifyInstance } from "fastify";
import request from "supertest"
import { prisma } from "../config/prisma";
import bcrjs from "bcryptjs"
const { hash } = bcrjs

export async function CreateAndAuthenticateUserTest(app: FastifyInstance, role: "CLIENT" | "BOSS" | "EMPLOYEE") {

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

    const { acessToken } = authenticateUser.body

    return { acessToken }
}