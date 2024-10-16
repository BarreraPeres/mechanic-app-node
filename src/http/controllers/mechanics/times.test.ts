import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest"
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import { prisma } from "../../../config/prisma";


describe("Avalieble Times Controller (e2e)", async () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(() => {
        app.close()
    })

    it("should be hours avaliebles for mechanic", async () => {
        const { accessToken } = await CreateAndAuthenticateUserTest(app, "CLIENT")

        const mechanic = await prisma.mechanic.create({
            data: {
                name: "mechanic",
                phone: "123456",
                latitude: -23.3037956,
                longitude: -45.9712603
            }
        })

        const responseTimes = await request(app.server)
            .get(`/times/${mechanic.id}`)
            .auth(accessToken, { type: "bearer" })
            .send()


        expect(responseTimes.statusCode).toEqual(200)

        expect(responseTimes.body.avaliebleTimes).toEqual(["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
            "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
            "16:00", "16:30", "17:00", "17:30"])

    })
})