import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function schedulesRoutes(app: FastifyInstance) {
    app.post("/schedule", create)
}