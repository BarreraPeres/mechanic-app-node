import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeFetchNearbyMechanicsUseCase } from "../../../use-cases/factories/make-fetch-nearby-mechanics.use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const nearbyQuery = z.object({
        longitude: z.coerce.number().refine((longitude) => {
            return Math.abs(longitude) <= 90
        }),
        latitude: z.coerce.number().refine((latitude) => {
            return Math.abs(latitude) <= 180
        })
    })

    const { latitude, longitude } = nearbyQuery.parse(request.query)

    const NearbyMechanics = MakeFetchNearbyMechanicsUseCase()



    const { mechanics } = await NearbyMechanics.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })

    return reply.status(200).send({
        mechanics
    })


}