import fastify from "fastify";
import { schedulesRoutes } from "./http/controllers/schedules/routes";
import { orderServicesRoutes } from "./http/controllers/order-services/routes";
import { errorHandler } from "./error-handler";
import { mechanicsRoutes } from "./http/controllers/mechanics/routes";
import { userRoutes } from "./http/controllers/users/routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { vehiclesRoutes } from "./http/controllers/vehicles/routes";
import fastifyCors from "@fastify/cors";
import { env } from "./env";

export const app = fastify()

app.register(fastifyCors, {
    origin: [env.URL_FRONTEND],
    credentials: true // to share the cookies
})

app.register(fastifyJwt, {
    secret: "password-super-secret",
    cookie: {
        cookieName: "refreshToken",
        signed: false
    },
    sign: {
        expiresIn: "10m"
    }
})
app.register(fastifyCookie)

app.register(orderServicesRoutes)
app.register(schedulesRoutes)
app.register(mechanicsRoutes)
app.register(userRoutes)
app.register(vehiclesRoutes)

app.setErrorHandler(errorHandler)