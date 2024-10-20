import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest"
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import { prisma } from "../../../config/prisma";
import bcrjs from "bcryptjs"
const { hash } = bcrjs
beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})



describe("Verify Cookie Existing (e2e)", async () => {
    it("should be return false", async () => {
        const res = await request(app.server)
            .get("/verify/refresh")


        expect(res.body).toEqual(false)
    })

    it("should be return true", async () => {

        await prisma.user.create({
            data: {
                name: "esperança",
                password_hash: await hash("123456", 6),
                cpf: "123456",
                email: "esperanca@gmail.com",
            }
        })

        const loginRes = await request(app.server)
            .post("/login")
            .send({
                username: "esperanca@gmail.com",
                password: "123456"
            })

        const cookie = loginRes.get("Set-Cookie")
        if (!cookie) {
            return;
        }

        const res = await request(app.server)
            .get("/verify/refresh")
            .set("Cookie", cookie)


        expect(res.body).toEqual(true)
    })

})