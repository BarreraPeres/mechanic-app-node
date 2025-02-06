import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { MakeGetVehiclesUseCase } from "../../../use-cases/factories/make-get-vehicles.use-case";

export async function getVehicles(request: FastifyRequest, reply: FastifyReply) {

    const getVehiclesUseCase = MakeGetVehiclesUseCase()

    try {
        const vehicles = await getVehiclesUseCase.execute({
            user_id: request.user.sub
        })

        return reply.send({
            vehicles
        })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }


}