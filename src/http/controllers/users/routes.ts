import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { jwtVerify } from "../../hooks/jwt-verify";
import { refresh } from "./refresh";
import { verifyCookieExisting } from "./verify-cookie-existing";


export async function userRoutes(app: FastifyInstance) {
    app.post("/register", register)
    app.post("/login", authenticate)
    app.patch("/token/refresh", refresh)
    app.get("/verify/refresh", verifyCookieExisting)

    app.get("/me", { onRequest: jwtVerify }, profile)

}