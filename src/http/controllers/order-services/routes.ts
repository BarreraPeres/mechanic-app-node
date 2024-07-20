import { FastifyInstance } from "fastify";
import { issueService } from "./issue-service";
import { avaliebleTimes } from "./get-avalieble-times";


export async function orderServicesRoutes(app: FastifyInstance) {

    //employee
    app.post("/order-service/:scheduling_id/issue", issueService)
    app.get("/times/:mechanicId", avaliebleTimes)
}