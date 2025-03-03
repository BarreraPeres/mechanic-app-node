import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import request from 'supertest'
import { CreateVehicleAndMechanicTest } from "../../../utils/create-vehicle-and-mechanic-test";
import { prisma } from "../../../config/prisma";

describe("get Order Services Controller (e2e)", async () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be possible to get the order services by id", async () => {

        const { accessToken } = await CreateAndAuthenticateUserTest(app, "EMPLOYEE")

        const { vehicle, mechanic } = await CreateVehicleAndMechanicTest(app)

        const user = await prisma.user.findFirstOrThrow()

        const scheduling = await prisma.scheduling.create({
            data: {
                description: "“I need an oil change for my car",
                scheduled_for: new Date(),
                type: "MAINTENANCE",
                request_at: new Date(),
                user_id: user.id,
                vehicle_id: vehicle.id,
                mechanic_id: mechanic.id,
            }
        })

        const os = await prisma.orderService.create({
            data:
            {
                vehicle_id: vehicle.id,
                scheduling_id: scheduling.id,
                mechanic_id: mechanic.id,
                description: "Oil change",
                end_date: new Date(),
                status: "SCHEDULED",
                start_date: new Date(),
                value: 100
            },
        })

        const getOrderServiceResponse = await request(app.server)
            .get(`/order-service/${os.id}`)
            .auth(accessToken, { type: "bearer" })
            .send()
        console.log(getOrderServiceResponse.body)
        expect(getOrderServiceResponse.statusCode).toBe(200)
        expect(getOrderServiceResponse.body.orderServices.orderService).toEqual(expect.objectContaining({
            status: "SCHEDULED",
            description: "Oil change",
            start_date: expect.any(String)
        }))
    })
})