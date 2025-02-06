import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { MakeUpdateVehicleUseCase } from "../../../use-cases/factories/make-update-vehicle.use-case";
import z from "zod";

export async function updateVehicle(request: FastifyRequest, reply: FastifyReply) {

    const updateVehicleBody = z.object({
        plate: z.string().min(5),
        model: z.string(),
        year: z.number(),
        brand: z.string()
    })
    const updateVehicleParams = z.object({
        id: z.string().uuid()
    })

    const { brand, model, plate, year } = updateVehicleBody.parse(request.body)
    const { id } = updateVehicleParams.parse(request.params)
    console.log("oiiiiiiiiiiiiiiiiii", id)

    const updateVehicleUseCase = MakeUpdateVehicleUseCase()

    try {


        const vehicle = await updateVehicleUseCase.execute({
            vehicle_id: id,
            brand,
            model,
            year,
            plate
        })

        return reply.status(200).send({
            vehicle
        })

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(401).send({ message: err.message })
        }
        throw err
    }


}