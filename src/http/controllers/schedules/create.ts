import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../config/prisma";

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const scheduleSchemaBody = z.object({
        user_id: z.string().uuid(),
        scheduledFor: z.string().nullish(),
        vehicle_id: z.string().uuid(),
        description: z.string().min(5),
        type: z.enum(["MAINTENANCE", "REPAIR", "INSPECTION"])
    })

    const { scheduledFor, user_id, vehicle_id, description, type } = scheduleSchemaBody.parse(request.body)

    const vehicle = await prisma.vehicle.findFirst({
        where: {
            id: vehicle_id,
            user_id: user_id
        }
    })

    if (!vehicle) {
        throw new Error("Vehicle not found!")
    }

    const schedule = await prisma.scheduling.create({
        data: {
            scheduledFor,
            description,
            user_id,
            vehicle_id,
            type
        }
    })

    return reply.status(201).send({ schedule_id: schedule.id })

}