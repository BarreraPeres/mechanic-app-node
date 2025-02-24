import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeFetchOrderServiceUseCase } from "../../../use-cases/factories/make-fetch-order-services.use-case";
import { InvalidCredencialsError } from "../../../use-cases/errors/invalid-credencials-error";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
    try {
        const fetchOrderServicesParms = z.object({
            mechanicId: z.string()
        })
        const fetchOrderServicesQuery = z.object({
            status: z.enum(["PENDING", "SCHEDULED", "FINESHED"]).optional(),
            page: z.string().nullish().default("0").transform(Number)
        })

        const { status, page } = fetchOrderServicesQuery.parse(request.query)

        const { mechanicId } = fetchOrderServicesParms.parse(request.params)

        const fetchOrderService = MakeFetchOrderServiceUseCase()

        const orderServices = await fetchOrderService.execute({
            mechanicId,
            status,
            page
        })

        return reply.send({
            orderServices
        })
    } catch (err) {
        if (err instanceof InvalidCredencialsError) {
            return reply.status(401).send({ message: err.message })
        }
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}