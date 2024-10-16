import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "../../../app";
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import { prisma } from "../../../config/prisma";


describe("Search Mechanics Controller (e2e)", async () => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(() => {
        app.close()
    })

    it("should return list of mechanics ", async () => {
        const { accessToken } = await CreateAndAuthenticateUserTest(app, "CLIENT")

        await prisma.mechanic.createMany({
            data: [
                {
                    name: "mechanic",
                    phone: "123456",
                    latitude: -23.3037956,
                    longitude: -45.9712603
                },
                {
                    name: "mechanic_2",
                    phone: "123456",
                    latitude: -23.3037956,
                    longitude: -45.9712603
                }
            ]
        })
        const mechanics = await request(app.server)
            .get("/mechanics/search")
            .query({
                query: "mechanic",
            })
            .auth(accessToken, { type: "bearer" })
            .send()

        expect(mechanics.statusCode).toEqual(200)
        expect(mechanics.body.mechanics).toHaveLength(2)
    })

})