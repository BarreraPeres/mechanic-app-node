import { FastifyReply, FastifyRequest } from "fastify";
import { MakeGetUserProfile } from "../../../use-cases/factories/make-get-user-profile.use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function profile(request: FastifyRequest, reply: FastifyReply) {

    const getUserProfileUseCase = MakeGetUserProfile()

    try {
        const user = await getUserProfileUseCase.execute({
            userId: request.user.sub
        })

        return reply.send({
            user: {
                name: user.user.name,
                email: user.user.email,
                cpf: user.user.cpf,
                role: user.user.role
            }
        })

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }


}