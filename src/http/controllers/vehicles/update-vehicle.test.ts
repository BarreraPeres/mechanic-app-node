import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "../../../app";
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";
import { CreateVehicleAndMechanicTest } from "../../../utils/create-vehicle-and-mechanic-test";


describe("Get Vehicle Controller (e2e)", async () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be possible to update vehicles of user", async () => {
        const { refreshToken, accessToken } = await CreateAndAuthenticateUserTest(app, "CLIENT")

        const { vehicle } = await CreateVehicleAndMechanicTest(app)

        const vehiclesUpdatedRes = await request(app.server)
            .put(`/vehicle/${vehicle.id}/update`)
            .auth(accessToken, { type: "bearer" })
            .send({
                model: "gol",
                plate: "cis-1111",
                brand: "volkswagenn",
                year: 1999
            })


        console.log("vehicle", vehicle)
        console.log("vehiclesUpdatedRes.body.vehicles", vehiclesUpdatedRes.body.vehicles)
        expect(vehiclesUpdatedRes.statusCode).toEqual(200)
        expect(vehiclesUpdatedRes.body.vehicle.vehicle).toEqual(expect.objectContaining({ plate: "cis-1111" }))

    })



})