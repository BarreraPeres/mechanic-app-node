import fastify from "fastify";
import { schedulesRoutes } from "./http/controllers/schedules/routes";
import { orderServicesRoutes } from "./http/controllers/order-services/routes";
import { errorHandler } from "./error-handler";


export const app = fastify()


app.register(orderServicesRoutes)
app.register(schedulesRoutes)

app.setErrorHandler(errorHandler)