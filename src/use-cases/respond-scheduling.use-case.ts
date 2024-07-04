
import { prisma } from "../config/prisma"

interface responseSchedulingRequest {
    accepted: boolean
    id: string
}

interface responseSchedulingResponse {
    status: string;
}

export async function responseSchedulingUseCases({ accepted, id }: responseSchedulingRequest): Promise<responseSchedulingResponse> {

    const updateStatus = accepted ? "SCHEDULED" : "REJECTED"

    const [scheduleUpdate, orderService] = await Promise.all([

        prisma.scheduling.update({
            where: {
                id,
            },
            data: {
                status: updateStatus,
            }
        }),

        prisma.orderService.update({
            where: {
                scheduling_id: id
            },
            data: {
                status: updateStatus,
            }
        })
    ])

    return { status: scheduleUpdate.status }
}