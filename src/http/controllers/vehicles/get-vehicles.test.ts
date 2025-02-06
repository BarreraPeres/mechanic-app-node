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
    it("should be possible to fetch vehicles of user", async () => {

        const { accessToken } = await CreateAndAuthenticateUserTest(app, "CLIENT")
        await CreateVehicleAndMechanicTest(app)

        const res = await request(app.server)
            .get(`/vehicles`)
            .auth(accessToken, { type: "bearer" })
            .send();

        console.log(res.body.vehicles.vehicles)

        expect(res.statusCode).toEqual(200)
        expect(res.body.vehicles.vehicles).toHaveLength(1)
        expect(res.body.vehicles.vehicles).toEqual([
            expect.objectContaining({ brand: "volkswagenn" })
        ])
    })
})