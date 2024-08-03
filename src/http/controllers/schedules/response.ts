import { FastifyReply, FastifyRequest } from "fastify";
import z, { string } from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { MakeResponderSchedulingUseCase } from "../../../use-cases/factories/make-responder-scheduling.use-case";

export async function response(request: FastifyRequest, reply: FastifyReply) {
    const clientRespondBody = z.object({
        accepted: z.boolean()
    })
    const clientRespondParms = z.object({
        id: string().uuid()
    })

    //const { id } = request.params as { id: string }
    const { id } = clientRespondParms.parse(request.params)
    const { accepted } = clientRespondBody.parse(request.body)

    const responseSchedulingUSeCases = MakeResponderSchedulingUseCase()

    try {
        await responseSchedulingUSeCases.execute({
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
