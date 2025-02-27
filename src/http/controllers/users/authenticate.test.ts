import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest";

describe("Authenticate Controller (e2e)", async () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be possible to authenticate", async () => {

        await request(app.server)
            .post("/register")
            .send({
                name: "arthur morgan",
                password: "123456",
                email: "arthurMorgan@gmail.com",
                cpf: "123456",
                role: "CLIENT"
            })

        const user = await request(app.server)
            .post("/login")
            .send({
                password: "123456",
                username: "arthurMorgan@gmail.com"
            })

        expect(user.status).toBe(200)
        expect(user.body).toEqual({
            accessToken: expect.any(String)
        })

    })

})