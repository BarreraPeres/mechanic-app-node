import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../../config/prisma";
import { responseSchedulingUseCases } from "../../../use-cases/respond-scheduling.use-case";

export async function clientRespondScheduling(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
        accepted: z.boolean()
    })

    const { id } = request.params as { id: string }
    const { accepted } = schema.parse(request.body)

    const responseScheduling = await responseSchedulingUseCases({
        accepted,
        id
    })

    return reply.status(200).send({ responseScheduling })

}
