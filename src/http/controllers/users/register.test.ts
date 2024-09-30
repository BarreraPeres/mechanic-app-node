
import { it, expect, describe, beforeAll, afterAll } from "vitest";
import { app } from "../../../app";
import request from "supertest"

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close
})

describe("Register Controller (e2e)", async () => {

    it("should be possible to register", async () => {
        const response = await request(app.server)
            .post("/register")
            .send({
                name: "arthur morgan",
                password: "123456",
                email: "arthurMorgan@gmail.com",
                cpf: "123456"
            })

        expect(response.status).toEqual(201)
        expect(response.body).toBeDefined()
    })


})