import { FastifyInstance } from "fastify";
import { jwtVerify } from "../../hooks/jwt-verify";
import { register } from "./register";
import { getVehicles } from "./get-vehicles";
import { updateVehicle } from "./update-vehicle";
import { getVehicleById } from "./get-vehicle-by-id";

export async function vehiclesRoutes(app: FastifyInstance) {
    app.addHook("onRequest", jwtVerify)

    app.post("/vehicle", register)
    app.get("/vehicles", getVehicles)
    app.get("/vehicle/:id", getVehicleById)


    app.put("/vehicle/:id/update", updateVehicle)

}