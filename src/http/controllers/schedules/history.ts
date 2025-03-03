import { FastifyReply, FastifyRequest } from "fastify";
import { MakeFetchSchedulingHistoryUseCase } from "../../../use-cases/factories/make-fetch-scheduling-history.use-case";
import z from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {

    const scheduleQuerySchema = z.object({
        status: z.enum(["PENDING", "SCHEDULED", "FINISHED", "IN_PROGRESS", "CANCELED"]).optional(),
        page: z.string().nullish().default("0").transform(Number)
    })

    const { status, page } = scheduleQuerySchema.parse(request.query)

    const schedulingHistoryUseCase = MakeFetchSchedulingHistoryUseCase()
    const { schedules } = await schedulingHistoryUseCase.execute({
        userId: request.user.sub,
        page,
        status
    })

    return reply.send({ schedules })
}