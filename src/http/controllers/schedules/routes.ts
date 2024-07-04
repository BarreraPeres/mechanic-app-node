import { FastifyInstance } from "fastify";
import { create } from "./create";
import { clientRespondScheduling } from "./client-respond-scheduling";
import { availableTimes } from "../order-services/get-avalieble-times";


export async function schedulesRoutes(app: FastifyInstance) {
    app.post("/scheduling", create)
    //employee

    app.patch("/scheduling/:id/respond", clientRespondScheduling)

}