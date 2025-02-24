import { FastifyReply, FastifyRequest } from "fastify";
import { MakeGetMechanicsUseCase } from "../../../use-cases/factories/make-get-mechanics.use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getMechanics = MakeGetMechanicsUseCase()

        const { user } = await getMechanics.execute({
            userId: request.user.sub
        })

        return reply.status(200).send({
            userWithMechanics: user
        })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

}