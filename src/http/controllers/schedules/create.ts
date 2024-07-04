import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { SchedulingUseCases } from "../../../use-cases/create-scheduling.use-case";
import { PrismaSchedulingRepository } from "../../../repositories/prisma/prisma-scheduling-repository";
import { ScheduledTimeExistsError } from "../../../use-cases/errors/scheduled-time-exists-error";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { PrismaVehicleRepository } from "../../../repositories/prisma/prisma-vehicle-repository";
import { PrismaMechanicRepository } from "../../../repositories/prisma/prisma-mechanic-repository";

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const scheduleSchemaBody = z.object({
        user_id: z.string().uuid(),
        scheduled_for: z.coerce.date(),//.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
        vehicle_id: z.string().uuid(),
        mechanic_id: z.string(),
        description: z.string().min(5),
        type: z.enum(["MAINTENANCE", "REPAIR", "INSPECTION"])
    })

    const { user_id, scheduled_for, vehicle_id, mechanic_id, description, type } = scheduleSchemaBody.parse(request.body)

    const vehicleRepository = new PrismaVehicleRepository()
    const prismaRepository = new PrismaSchedulingRepository()
    const mechanicRepository = new PrismaMechanicRepository()
    const schedulingUseCases = new SchedulingUseCases(prismaRepository, vehicleRepository, mechanicRepository)

    try {
        const { scheduling } = await schedulingUseCases.execute({
            user_id,
            scheduled_for,
            vehicle_id,
            mechanic_id,
            description,
            type

        })
        return reply.status(201).send({
            scheduling: scheduling.id,
            scheduled_for: scheduling.scheduled_for,
            status: scheduling.status
        })

    } catch (error) {
        if (error instanceof ScheduledTimeExistsError) {
            return reply.status(409).send({ message: error.message })
        }
        if (error instanceof ResourceNotFoundError) {
            return reply.status(400).send({ message: error.message })
        }
        throw error
    }

}