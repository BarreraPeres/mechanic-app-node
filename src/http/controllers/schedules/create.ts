import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ScheduledTimeExistsError } from "../../../use-cases/errors/scheduled-time-exists-error";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { MakeCreateSchedulingUseCase } from "../../../use-cases/factories/make-create-scheduling.use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const scheduleSchemaBody = z.object({
        scheduled_for: z.coerce.date(),
        vehicle_id: z.string().uuid(),
        mechanic_id: z.string(),
        description: z.string().min(5),
        type: z.enum(["MAINTENANCE", "REPAIR", "INSPECTION"])
    })

    const { scheduled_for, vehicle_id, mechanic_id, description, type } = scheduleSchemaBody.parse(request.body)


    const schedulingUseCases = MakeCreateSchedulingUseCase()

    try {
        const { scheduling } = await schedulingUseCases.execute({
            user_id: request.user.sub,
            scheduled_for,
            vehicle_id,
            mechanic_id,
            description,
            type

        })

        return reply.status(201).send({
            scheduling
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