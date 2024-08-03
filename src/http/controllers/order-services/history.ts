import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeFetchVehicleOrderServiceUseCase } from "../../../use-cases/factories/make-fetch-vehicle-order-service.use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
    const historyServicesVehicleParms = z.object({
        vehicleId: z.string().uuid()
    })

    const historyServicesVehicleQuery = z.object({
        page: z.string().nullish().default("0").transform(Number)
    })

    const { vehicleId } = historyServicesVehicleParms.parse(request.params)
    const { page } = historyServicesVehicleQuery.parse(request.query)

    const historyServiceVehicleOrderService = MakeFetchVehicleOrderServiceUseCase()

    const orderServices = await historyServiceVehicleOrderService.execute({
        page,
        vehicleId
    })

    return reply.send({
        orderServices
    })
}