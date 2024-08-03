import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest"
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";

describe("Create Mechanic Controller (e2e)", async () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })


    it("should create a new mechanic", async () => {
        const { acessToken } = await CreateAndAuthenticateUserTest(app, "BOSS")

        const mechanicResponse = await request(app.server)
            .post("/mechanic")
            .auth(acessToken, { type: "bearer" })
            .send({
                name: "mechanic",
                phone: "123456",
                latitude: -23.3037956,
                longitude: -45.9712603
            })

        expect(mechanicResponse.status).toEqual(201)
    })
})