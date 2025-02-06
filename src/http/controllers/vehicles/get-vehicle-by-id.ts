import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { MakeGetVehicleByIdUseCase } from "../../../use-cases/factories/make-get-vehicle-by-id.use-case";
import z from "zod";

export async function getVehicleById(request: FastifyRequest, reply: FastifyReply) {

    const vehicleBodySchema = z.object({
        id: z.string()
    })

    const { id } = vehicleBodySchema.parse(request.params)
    const getVehiclesUseCase = MakeGetVehicleByIdUseCase()

    try {
        const vehicle = await getVehiclesUseCase.execute({
            id
        })

        return reply.send({
            vehicle
        })

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }


}