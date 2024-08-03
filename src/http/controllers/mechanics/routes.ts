import { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";
import { jwtVerify } from "../../hooks/jwt-verify";
import { nearby } from "./nearby";
import { times } from "./times";
import { jwtVerifyUserRole } from "../../hooks/jwt-verify-user-role";

export async function mechanicsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", jwtVerify)


    app.get("/mechanics/search", search)
    app.get("/times/:mechanicId", times)

    app.get("/mechanics/nearby", nearby)

    app.post("/mechanic", { onRequest: [jwtVerifyUserRole("BOSS")] }, create)
}