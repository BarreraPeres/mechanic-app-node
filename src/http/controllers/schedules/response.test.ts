import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest"
import { prisma } from "../../../config/prisma";
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import { CreateVehicleAndMechanicTest } from "../../../utils/create-vehicle-and-mechanic-test";

describe("Response Scheduling", async () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it("should be possible to client responder the sheduling", async () => {

        const { accessToken } = await CreateAndAuthenticateUserTest(app, "CLIENT")
        const user = await prisma.user.findFirstOrThrow()
        const { mechanic, vehicle } = await CreateVehicleAndMechanicTest(app)

        const scheduling = await prisma.scheduling.create({
            data: {
                description: "“I need an oil change for my car",
                scheduled_for: new Date(),
                type: "MAINTENANCE",
                request_at: new Date(),
                user_id: user.id,
                vehicle_id: vehicle.id,
                mechanic_id: mechanic.id,
                status: "SHEDULED"
            }
        })

        // const orderServiceOfShedule = await prisma.orderService.create({
        //     data: {
        //         vehicle_id: vehicle.id,
        //         scheduling_id: scheduling.id,
        //         mechanic_id: mechanic.id,
        //         description: "Oil change",
        //         end_date: new Date(),
        //         status: "SCHEDULED",
        //         start_date: new Date(),
        //         value: 100
        //     }
        // })



        const response = await request(app.server)
            .patch(`/scheduling/${scheduling.id}/response`)
            .auth(accessToken, { type: "bearer" })
            .send({
                accepted: true,
            })

        expect(response.statusCode).toBe(200)
    })
})