import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeGetInvoicingValuesUseCase } from "../../../use-cases/factories/make-get-invoicing-values.use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function invoicing(request: FastifyRequest, reply: FastifyReply) {
    const invoicingServicesParms = z.object({
        mechanicId: z.string()
    })

    const { mechanicId } = invoicingServicesParms.parse(request.params)

    const invoicingServiceOrderService = MakeGetInvoicingValuesUseCase()

    try {
        const sum = await invoicingServiceOrderService.execute({
            mechanicId
        })

        return reply.send({
            sum
        })

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(400).send({ message: error.message })
        }
        throw error
    }
}