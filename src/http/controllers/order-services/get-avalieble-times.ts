import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaMechanicRepository } from "../../../repositories/prisma/prisma-mechanic-repository";
import { PrismaOrderServiceRepository } from "../../../repositories/prisma/prisma-order-service-repository";
import { AvaliebleUseCase } from "../../../use-cases/avalieble-times-mechanic.use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";



export async function avaliebleTimes(request: FastifyRequest, reply: FastifyReply) {
    const schemaParms = z.object({
        mechanicId: z.string().uuid()
    })

    const { mechanicId } = schemaParms.parse(request.params)

    const orderServiceRepository = new PrismaOrderServiceRepository()
    const mechanicRepository = new PrismaMechanicRepository()
    const avaliebleUseCase = new AvaliebleUseCase(mechanicRepository, orderServiceRepository)

    try {

        const avaliebleTimes = avaliebleUseCase.execute({ mechanicId })
        return reply.send({ avaliebleTimes })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(400).send({ message: err.message })
        }
        throw err
    }
}