import { FastifyReply, FastifyRequest } from "fastify";
import { MakeFetchSchedulingHistoryUseCase } from "../../../use-cases/factories/make-fetch-scheduling-history.use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {

    const schedulingHistoryUseCase = MakeFetchSchedulingHistoryUseCase()

    const { schedules } = await schedulingHistoryUseCase.execute({
        userId: request.user.sub
    })

    return reply.send({ schedules })
}