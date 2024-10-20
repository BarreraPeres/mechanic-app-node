import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest"
import { prisma } from "../../../config/prisma";
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import { CreateVehicleAndMechanicTest } from "../../../utils/create-vehicle-and-mechanic-test";

afterAll(async () => {
    await app.close()
})

beforeAll(async () => {
    await app.ready()
})

describe("Fetch History Schedulings Controller (e2e)", async () => {

    it("should be able to feth history of schedules", async () => {
        const { accessToken } = await CreateAndAuthenticateUserTest(app, "CLIENT")

        const user = await prisma.user.findFirstOrThrow()
        const { mechanic, vehicle } = await CreateVehicleAndMechanicTest(app)

        await prisma.scheduling.createMany({
            data: [
                {
                    description: "“I need an oil change for my car",
                    scheduled_for: "2024-07-09T04:12:12.000Z",
                    type: "MAINTENANCE",
                    request_at: "2024-07-05T04:12:12.000Z",
                    user_id: user.id,
                    vehicle_id: vehicle.id,
                    mechanic_id: mechanic.id
                },
                {
                    description: "“I need an oil change for my car",
                    scheduled_for: "2024-07-09T04:12:12.000Z",
                    type: "MAINTENANCE",
                    request_at: "2024-07-05T04:12:12.000Z",
                    user_id: user.id,
                    vehicle_id: vehicle.id,
                    mechanic_id: mechanic.id
                }
            ]
        })
        const responseHistorys = await request(app.server)
            .get("/schedules/history")
            .auth(accessToken, { type: "bearer" })
            .send()

        expect(responseHistorys.statusCode).toBe(200)
        expect(responseHistorys.body.schedules).toHaveLength(2)
    })
})