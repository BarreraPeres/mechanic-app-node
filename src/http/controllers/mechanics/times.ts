import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeAvaliebleUseCase } from "../../../use-cases/factories/make-avalieble.use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function times(request: FastifyRequest, reply: FastifyReply) {
    const avaliebleTimesParms = z.object({
        mechanicId: z.string().uuid()
    })

    const { mechanicId } = avaliebleTimesParms.parse(request.params)

    const avaliebleUseCase = MakeAvaliebleUseCase()

    try {
        const avaliebleTimes = await avaliebleUseCase.execute({
            mechanicId
        })

        return reply.send(
            avaliebleTimes
        )

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }
}