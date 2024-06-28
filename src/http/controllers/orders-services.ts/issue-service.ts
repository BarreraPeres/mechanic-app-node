import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../config/prisma";

export async function issueService(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
        value: z.number().int(),
        description: z.string(),
        scheduling_id: z.string().uuid()
    })
    const { value, description, scheduling_id } = schema.parse(request.body)

    const scheduling = await prisma.scheduling.findUnique({
        where: {
            id: scheduling_id
        }
    })

    if (!scheduling) {
        throw new Error("schedule not found!")
    }


    const ordenService = await prisma.orderService.create({
        data: {
            value,
            description,
            scheduling_id
        }
    })

    return reply.status(201).send({ ordenService })
}