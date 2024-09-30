import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeSearchMechanicUseCase } from "../../../use-cases/factories/make-search-mechanic.use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const mechanicQuery = z.object({
        query: z.string().nullish().optional(),//.nullish().optional(),
        page: z.string().nullish().default("0").transform(Number)
    })

    const { page, query } = mechanicQuery.parse(request.query)

    const searchMechanic = MakeSearchMechanicUseCase()

    const { mechanics } = await searchMechanic.execute({
        page, query
    })

    return reply.status(200).send({ mechanics })
}

