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

    it("should be possible to get vehicle of user", async () => {

        const { refreshToken } = await CreateAndAuthenticateUserTest(app, "CLIENT")

        const { vehicle } = await CreateVehicleAndMechanicTest(app)

        const id = vehicle.id
        const vehiclesRes = await request(app.server)
            .get(`/vehicle/${id}`)
            .set("Cookie", refreshToken)
            .send()

        expect(vehiclesRes.statusCode).toEqual(200)
        expect(vehiclesRes.body.vehicle.vehicle).toEqual(
            expect.objectContaining({ model: "gol" }
            ))

    })



})