import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { InvalidCredencialsError } from "../../../use-cases/errors/invalid-credencials-error";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { MakeGetOrderServiceByIdUseCase } from "../../../use-cases/factories/make-get-order-service-by-id.use-case";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getOrderServicesParms = z.object({
            orderServiceId: z.string()
        })

        const { orderServiceId } = getOrderServicesParms.parse(request.params)

        const getOrderService = MakeGetOrderServiceByIdUseCase()
        const orderServices = await getOrderService.execute({
            orderServiceId
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