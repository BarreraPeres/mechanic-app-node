import { FastifyInstance } from "fastify";
import { issueService } from "./issue-service";


export async function orderServicesRoutes(app: FastifyInstance) {

    //employee
    app.post("/order-service/:scheduling_id/issue", issueService)

}