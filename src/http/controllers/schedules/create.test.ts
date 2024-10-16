import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest"
import { prisma } from "../../../config/prisma";
import { CreateVehicleAndMechanicTest } from "../../../utils/create-vehicle-and-mechanic-test";
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
describe("Create Schedule Controller (2e2)", async () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(() => {
        app.close()
    })

    it("should be able to create a new scheduling", async () => {
        const { accessToken } = await CreateAndAuthenticateUserTest(app, "CLIENT")
        const user = await prisma.user.findFirstOrThrow()
        const { mechanic, vehicle } = await CreateVehicleAndMechanicTest(app)
        const responseCreate = await request(app.server)
            .post("/scheduling")
            .auth(accessToken, { type: "bearer" })
            .send({
                user_id: user.id,
                scheduled_for: new Date(),
                vehicle_id: vehicle.id,
                mechanic_id: mechanic.id,
                description: "some description of the service for mechanics",
                type: "MAINTENANCE"
            })

        expect(responseCreate.statusCode).toEqual(201)
        expect(responseCreate.body.scheduling).toBeDefined()
        expect(responseCreate.body.scheduling).toEqual(expect.objectContaining({ description: "some description of the service for mechanics" }))
    })
})