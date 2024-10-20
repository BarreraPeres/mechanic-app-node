import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import request from 'supertest'
import { CreateVehicleAndMechanicTest } from "../../../utils/create-vehicle-and-mechanic-test";
import { prisma } from "../../../config/prisma";

describe("History Services Vehicle Controller (e2e)", async () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be possible to search the history of services the vehicle", async () => {

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
        const scheduling_2 = await prisma.scheduling.create({
            data: {
                description: "“I need an oil change for my car",
                scheduled_for: new Date(),
                type: "MAINTENANCE",
                request_at: new Date(),
                user_id: user.id,
                vehicle_id: vehicle.id,
                mechanic_id: mechanic.id
            }
        })



        await prisma.orderService.createMany({
            data: [
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
                {
                    vehicle_id: vehicle.id,
                    scheduling_id: scheduling_2.id,
                    mechanic_id: mechanic.id,
                    description: "Oil change",
                    end_date: "2024-07-09T04:12:12.000Z",
                    status: "SCHEDULED",
                    start_date: "2024-07-05T04:12:12.000Z",
                    value: 100
                }
            ]
        })

        const responseHistory = await request(app.server)
            .get(`/order-services/${vehicle.id}/history`)
            .auth(accessToken, { type: "bearer" })
            .send({
                page: "0"
            })
        expect(responseHistory.statusCode).toBe(200)
        expect(responseHistory.body.orderServices.orderServices).toHaveLength(2)

    })
})