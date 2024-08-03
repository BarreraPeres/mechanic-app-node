import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "../../../app";
import { CreateAndAuthenticateUserTest } from "../../../utils/create-and-authenticate-user-test";


describe("Profile Controller (e2e)", async () => {


    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be possible to get profile of user", async () => {


        const { acessToken } = await CreateAndAuthenticateUserTest(app)

        const profileUser = await request(app.server)
            .get("/me")
            .auth(acessToken, { type: "bearer" })
            .send()

        expect(profileUser.statusCode).toEqual(200)
        expect(profileUser.body.user).toEqual(expect.objectContaining({ name: "esperança" }))

    })



})