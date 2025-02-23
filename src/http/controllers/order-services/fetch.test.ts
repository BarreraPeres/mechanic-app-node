import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import request from 'supertest'
import { CreateVehicleAndMechanicTest } from "../../../utils/create-vehicle-and-mechanic-test";
import { prisma } from "../../../config/prisma";

describe("Fetch Order Services Controller (e2e)", async () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be possible to fetch the order services", async () => {

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



        await prisma.orderService.create({
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

        const responseHistory = await request(app.server)
            .get(`/order-services/${mechanic.id}`)
            .auth(accessToken, { type: "bearer" })
            .send({
                page: "0"
            })

        console.log("responseHistory.body", responseHistory.body)
        expect(responseHistory.statusCode).toBe(200)
        expect(responseHistory.body.orderServices.orderServices).toHaveLength(1)
    })

})