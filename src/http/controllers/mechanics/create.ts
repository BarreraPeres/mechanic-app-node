import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeCreateMechanicUseCase } from "../../../use-cases/factories/make-create-mechanic.use-case";
import { KafkaProducer } from "../../../kafka/producer";

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

        const { mechanic } = await createMechanic.execute({
            latitude, longitude, name, phone, id_user: request.user.sub
        })

        /**
         * register mechanic workshop in chat-mechanic(mongoDb)
         */
        const kafkaProducer = new KafkaProducer()
        await kafkaProducer.exec("create-mechanic-workshop", {
            external_id: mechanic.id,
            mechanic_external_id: request.user.sub,
            name: mechanic.name,
            phone: mechanic.phone,
            latitude: mechanic.latitude,
            longitude: mechanic.longitude
        })

        return reply.status(201).send({
            mechanic
        })

    } catch (err) {
        throw err
    }
}