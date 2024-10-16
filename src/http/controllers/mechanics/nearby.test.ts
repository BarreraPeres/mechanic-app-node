import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import request from "supertest"
import { prisma } from "../../../config/prisma";

describe("Fetch Nearby Mechanics Controller (e2e)", async () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })


    it("should fetch mechanics nearby for user ", async () => {
        const { accessToken } = await CreateAndAuthenticateUserTest(app, "CLIENT")

        await prisma.mechanic.createMany({
            data: [
                {
                    name: "mechanic nearby",
                    phone: "123456",
                    latitude: -23.3037956,
                    longitude: -45.9712603
                },
                {
                    name: "mechanic far",
                    phone: "123456",
                    latitude: -27.0610928,
                    longitude: -49.5229501,
                }
            ]
        })

        const responseNearby = await request(app.server)
            .get("/mechanics/nearby")
            .query({
                latitude: -23.3037956,
                longitude: -45.9712603,
            })
            .auth(accessToken, { type: "bearer" })
            .send()

        expect(responseNearby.statusCode).toBe(200)
        expect(responseNearby.body.mechanics).toEqual([
            expect.objectContaining({
                name: "mechanic nearby",
            })
        ])
        expect(responseNearby.body.mechanics).toHaveLength(1)

    })
})
