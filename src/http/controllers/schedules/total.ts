import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { MakeGetSchedulesTotalUseCase } from "../../../use-cases/factories/make-get-schedules-total";

export async function total(request: FastifyRequest, reply: FastifyReply) {

    const userId = request.user.sub
    const getSchedulesTotal = MakeGetSchedulesTotalUseCase()

    try {
        const total = await getSchedulesTotal.execute({
            userId
        })
        return reply.status(200).send(total)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(400).send({ message: err.message })
        }
    }
}
