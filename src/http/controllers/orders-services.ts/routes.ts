import { FastifyInstance } from "fastify";
import { issueService } from "./issue-service";


export async function ordersServicesRoutes(app: FastifyInstance) {
    app.post("/issue", issueService)
}