import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest"
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import { prisma } from "../../../config/prisma";
describe("Register Vehicle Controller (e2e)", async () => {
    afterAll(() => {
        app.close()
    })
    beforeAll(async () => {
        app.ready()
    })

    it("should be able to register a vehicle", async () => {
        const { acessToken } = await CreateAndAuthenticateUserTest(app, "CLIENT")
        const user = await prisma.user.findFirstOrThrow()
        const responseRegister = await request(app.server)
            .post("/vehicle")
            .auth(acessToken, { type: "bearer" })
            .send({
                plate: "cis-1999",
                model: "gol",
                year: 1999,
                user_id: user.id
            })

        expect(responseRegister.statusCode).toBe(201)
        expect(responseRegister.body.vehicle).toEqual(
            expect.objectContaining({ model: "gol" })
        )
    })
})