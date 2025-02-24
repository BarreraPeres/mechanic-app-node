import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import request from "supertest"
import { prisma } from "../../../config/prisma";
import bcrjs from "bcryptjs"
const { hash } = bcrjs

describe("Get Mechanics Of User Controller (e2e)", async () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it("should get mechanics of user ", async () => {

        await prisma.mechanic.create({
            data: {
                id: "mechanic one one",
                name: "mechanic one one",
                phone: "123456",
                latitude: -23.3037956,
                longitude: -45.9712603
            },
        })

        await prisma.user.create({
            data: {
                name: "user",
                email: "user@email.com",
                password_hash: await hash("123456", 6),
                cpf: "1234567890100",
                role: "BOSS",
                mechanic: {
                    create: {
                        name: "mechanic one",
                        phone: "123456",
                        latitude: -23.3037956,
                        longitude: -45.9712603
                    },
                    connect: {
                        id: "mechanic one one"
                    }
                }
            }
        })

        const authenticateUser = await request(app.server)
            .post("/login")
            .send({
                password: "123456",
                username: "user@email.com"
            })
        const { accessToken } = authenticateUser.body

        const responseNearby = await request(app.server)
            .get("/mechanics")
            .auth(accessToken, { type: "bearer" })
            .send()

        expect(responseNearby.statusCode).toBe(200)
        expect(responseNearby.body.userWithMechanics.mechanic).toEqual([
            expect.objectContaining({
                name: "mechanic one one",
            }),
            expect.objectContaining({
                name: "mechanic one",
            }),
        ])
        expect(responseNearby.body.userWithMechanics.mechanic).toHaveLength(2)

    })
})
