import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest"

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})



describe("Make Logout (e2e)", async () => {
    it("should be make logout ", async () => {
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
        const res = await request(app.server)
            .get("/logout")
            .set("Cookie", cookie)
            .send()

        expect(res.get("Set-Cookie")).toEqual([
            expect.stringContaining("12 Apr 2022")
        ])
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toEqual("Logout successful")
    })



})