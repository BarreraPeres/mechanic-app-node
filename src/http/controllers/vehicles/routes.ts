import { FastifyInstance } from "fastify";
import { jwtVerify } from "../../hooks/jwt-verify";
import { register } from "./register";
import { getVehicles } from "./get-vehicle";
import { updateVehicle } from "./update-vehicle";

export async function vehiclesRoutes(app: FastifyInstance) {
    app.addHook("onRequest", jwtVerify)

    app.post("/vehicle", register)
    app.get("/vehicles", getVehicles)

    app.put("/vehicle/:id/update", updateVehicle)

}