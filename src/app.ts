import fastify from "fastify";
import { schedulesRoutes } from "./http/controllers/schedules/routes";
import { ordersServicesRoutes } from "./http/controllers/orders-services.ts/routes";

export const app = fastify()

app.register(schedulesRoutes)
app.register(ordersServicesRoutes)
