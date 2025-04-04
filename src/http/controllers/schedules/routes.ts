import { FastifyInstance } from "fastify";
import { create } from "./create";
import { response } from "./response";
import { history } from "./history";
import { jwtVerify } from "../../hooks/jwt-verify";
import { total } from "./total";

export async function schedulesRoutes(app: FastifyInstance) {
    app.addHook("onRequest", jwtVerify)

    app.post("/scheduling", create)
    app.patch("/scheduling/:id/response", response)

    app.get("/schedules/history", history)
    app.get("/schedules/total", total)
}