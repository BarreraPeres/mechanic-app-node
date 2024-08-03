import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { TimeNotAvailebleOrderServicesError } from "../../../use-cases/errors/time-not-avalieble-order-services-error";
import { ScheduleAlreadyOrderIssuedError } from "../../../use-cases/errors/schedule-already-order-issued-error";
import { MakeIssueOrderServiceUseCase } from "../../../use-cases/factories/make-issue-order-service.use-case";


export async function issue(request: FastifyRequest, reply: FastifyReply) {
    const schemaBody = z.object({
        value: z.number().int().positive(),
        description: z.string().min(4),
        start_date: z.coerce.date(),//.nullable(),//.optional(),
        end_date: z.coerce.date(),//.nullable()//optional()
        mechanic_id: z.string().optional()
    })

    const schemaParms = z.object({
        scheduling_id: z.string().uuid(),
    })


    const { value, description, end_date, start_date, mechanic_id } = schemaBody.parse(request.body)

    const { scheduling_id } = schemaParms.parse(request.params)

    const issueServiceUseCases = MakeIssueOrderServiceUseCase()

    try {
        const { orderService } = await issueServiceUseCases.execute({
            value,
            description,
            mechanic_id,
            end_date,
            scheduling_id,
            start_date,

        })
        return reply.status(201).send({ orderService })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(400).send({ message: err.message })
        }
        if (err instanceof TimeNotAvailebleOrderServicesError) {
            return reply.status(409).send({ message: err.message })
        }
        if (err instanceof ScheduleAlreadyOrderIssuedError) {
            return reply.status(409).send({ message: err.message })
        }
        throw err
    }






}