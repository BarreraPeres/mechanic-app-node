import { FastifyInstance } from "fastify";
import { issue } from "./issue";
import { history } from "./history";
import { jwtVerifyUserRole } from "../../hooks/jwt-verify-user-role";
import { jwtVerify } from "../../hooks/jwt-verify";

export async function orderServicesRoutes(app: FastifyInstance) {
    //employee
    app.addHook("onRequest", jwtVerifyUserRole("EMPLOYEE"))

    app.post("/order-service/:scheduling_id/issue", issue)
    app.get("/order-services/:vehicleId/history", history)

}