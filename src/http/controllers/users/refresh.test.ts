import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest"

describe("Refresh Token Controller (e2e)", async () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(() => {
        app.close()
    })

    it("should be possible refresh the token", async () => {

        await request(app.server)
            .post("/register")
            .send({
                email: "bruce@gmail.com",
                name: "bruce do wayne",
                cpf: "123456",
                password: "123456"
            })

        const login = await request(app.server)
            .post("/login")
            .send({
                username: "bruce@gmail.com",
                password: "123456"
            })

        const cookie = login.get("Set-Cookie")
        if (!cookie) {
            return;
        }


        const refreshResponse = await request(app.server)
            .patch("/token/refresh")
            .set("Cookie", cookie)
            .send()

        expect(refreshResponse.statusCode).toBe(200)
        expect(refreshResponse.body).toEqual({
            acessToken: expect.any(String)
        })
        expect(refreshResponse.get("Set-Cookie")).toEqual([
            expect.stringContaining("refreshToken=")
        ])
    })

})