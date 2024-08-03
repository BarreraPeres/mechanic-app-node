import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeCreateMechanicUseCase } from "../../../use-cases/factories/make-create-mechanic.use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const mechanicBody = z.object({
        name: z.string().min(3),
        phone: z.string().nullable(),
        latitude: z.coerce.number().refine((latitude) => {
            return Math.abs(latitude) <= 90
        }),
        longitude: z.coerce.number().refine((longitude) => {
            return Math.abs(longitude) <= 180
        })
    })

    const { latitude, longitude, name, phone } = mechanicBody.parse(request.body)
    const createMechanic = MakeCreateMechanicUseCase()
    try {

        const mechanic = await createMechanic.execute({
            latitude, longitude, name, phone
        })

        return reply.status(201).send({
            mechanic
        })

    } catch (err) {
        throw err
    }
}