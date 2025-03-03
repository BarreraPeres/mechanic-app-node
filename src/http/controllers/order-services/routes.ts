import { FastifyInstance } from "fastify";
import { issue } from "./issue";
import { history } from "./history";
import { jwtVerifyUserRole } from "../../hooks/jwt-verify-user-role";
import { fetch } from "./fetch";
import { get } from "./get";

export async function orderServicesRoutes(app: FastifyInstance) {
    //employee
    app.addHook("onRequest", jwtVerifyUserRole("BOSS", "EMPLOYEE"))

    app.post("/order-service/:scheduling_id/issue", issue)
    app.get("/order-services/:vehicleId/history", history)
    app.get("/order-services/:mechanicId", fetch)
    app.get("/order-service/:orderServiceId", get)

}