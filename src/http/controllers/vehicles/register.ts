import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeRegisterVehicleUseCase } from "../../../use-cases/factories/make-register-vehicle.use-case";
import { VehicleAlreadyRegisteredError } from "../../../use-cases/errors/vehicle-already-registered-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const vehicleRegisterBody = z.object({
        plate: z.string(),
        model: z.string(),
        year: z.number(),
        user_id: z.string().uuid(),
    })

    const { model, plate, user_id, year, } = vehicleRegisterBody.parse(request.body)

    const registerVehicleUseCase = MakeRegisterVehicleUseCase()

    try {

        const { vehicle } = await registerVehicleUseCase.execute({
            model, plate, user_id, year,
        })

        return reply.status(201).send({
            vehicle
        })

    } catch (e) {
        if (e instanceof VehicleAlreadyRegisteredError) {
            return reply.status(400).send({ message: e.message })
        }
        throw e
    }
}