import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { ResponseSchedulingUseCases } from "../../../use-cases/respond-scheduling.use-case";
import { PrismaSchedulingRepository } from "../../../repositories/prisma/prisma-scheduling-repository";
import { PrismaOrderServiceRepository } from "../../../repositories/prisma/prisma-order-service-repository";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function clientRespondScheduling(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
        accepted: z.boolean()
    })

    const { id } = request.params as { id: string }
    const { accepted } = schema.parse(request.body)

    const schedulingRepository = new PrismaSchedulingRepository()
    const orderServiceRepository = new PrismaOrderServiceRepository()
    const responseSchedulingUseCases = new ResponseSchedulingUseCases(schedulingRepository, orderServiceRepository)


    try {
        await responseSchedulingUseCases.execute({
            accepted,
            id
        })
        return reply.status(200).send()

    } catch (err) {

        if (err instanceof ResourceNotFoundError) {
            return reply.status(400).send({ message: err.message })
        }
    }


}
