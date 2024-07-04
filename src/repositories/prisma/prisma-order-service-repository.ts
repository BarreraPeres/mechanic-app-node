import { OrderService, Prisma } from "@prisma/client";
import { OrderServiceRepository } from "../order-service-repository";
import { prisma } from "../../config/prisma";


export class PrismaOrderServiceRepository implements OrderServiceRepository {
    create(data: Prisma.OrderServiceUncheckedCreateInput) {
        const orderService = prisma.orderService.create({
            data
        })
        return orderService
    }

    async findByDate(start_date: Date, end_date: Date) {
        const orderServices = await prisma.orderService.findMany({
            where: {
                AND: [
                    {
                        start_date: {
                            lte: end_date // Menor ou igual
                        },
                        end_date: {
                            gte: start_date // maior ou igual    
                        }
                    }
                ]
            }
        })
        return orderServices
    }


    async findSchedulingExisting(scheduling_id: string) {
        const scheduleAlreadyIssued = await prisma.orderService.findUnique({
            where: {
                scheduling_id
            }
        })
        return scheduleAlreadyIssued

    }


}