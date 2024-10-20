import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest"
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import { prisma } from "../../../config/prisma";
import { CreateVehicleAndMechanicTest } from "../../../utils/create-vehicle-and-mechanic-test";
describe("Issue Order Service Controller (e2e)", async () => {
    afterAll(async () => {
        app.close()
    })
    beforeAll(async () => {
        await app.ready()
    })

    it("should be possible to issue order service", async () => {
        const { accessToken } = await CreateAndAuthenticateUserTest(app, "EMPLOYEE")
        const user = await prisma.user.findFirstOrThrow()
        const { mechanic, vehicle } = await CreateVehicleAndMechanicTest(app)
        const schedulingResponse = await request(app.server)
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

        const { scheduling } = schedulingResponse.body

        const responseIssue = await request(app.server)
            .post(`/order-service/${scheduling.id}/issue`)
            .auth(accessToken, { type: "bearer" })
            .send({
                value: 2100,
                description: "some description",
                start_date: new Date(),
                end_date: new Date()
            })

        expect(responseIssue.statusCode).toBe(201)
        expect(responseIssue.body.orderService).toEqual(
            expect.objectContaining({ description: "some description" })
        )
    })
})