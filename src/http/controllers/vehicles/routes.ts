import { FastifyInstance } from "fastify";
import { jwtVerify } from "../../hooks/jwt-verify";
import { register } from "./register";

export async function vehiclesRoutes(app: FastifyInstance) {
    app.addHook("onRequest", jwtVerify)

    app.post("/vehicle", register)
}