import { $Enums, OrderService, Prisma } from "@prisma/client";
import { OrderServiceRepository } from "../order-service-repository";
import { prisma } from "../../config/prisma";


export class PrismaOrderServiceRepository implements OrderServiceRepository {

    create(data: Prisma.OrderServiceUncheckedCreateInput) {
        const orderService = prisma.orderService.create({
            data
        })
        return orderService
    }

    async findById(id: string) {
        const orderService = await prisma.orderService.findUnique({
            where: {
                id
            },
            include: {
                mechanic: true,
                vehicle: true
            }
        }) || null
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
    async save(schedulingId: string, UpdateStatus: $Enums.Status) {
        const response = await prisma.orderService.update({
            where: {
                scheduling_id: schedulingId
            },
            data: {
                status: UpdateStatus
            }
        })

        if (!response) {
            return null
        }

        return response
    }

    async findManyByMechanicId(mechanicId: string, page: number, status?: $Enums.Status) {
        if (status) {
            const OrderService = await prisma.orderService.findMany({
                where: {
                    mechanic_id: mechanicId,
                    status: status,
                },
                include: {
                    vehicle: true,
                    mechanic: true
                },
                take: 10,
                skip: page * 10
            })
            if (!OrderService) {
                return null
            }
            return OrderService
        } else {
            const OrderService = await prisma.orderService.findMany({
                where: {
                    mechanic_id: mechanicId,
                },
                include: {
                    vehicle: true,
                    mechanic: true
                },
                take: 10,
                skip: page * 10
            })
            if (!OrderService) {
                return null
            }
            return OrderService
        }
    }

    async findManyByVehicleId(vehicleId: string, page: number) {
        const orderServices = await prisma.orderService.findMany({
            where: {
                vehicle_id: vehicleId
            },
            take: 10,
            skip: page * 10
        })

        return orderServices
    }

    async getInvoicing(mechanicId: string) {
        const invoicing = await prisma.orderService.aggregate({
            _sum: {
                value: true
            },
            where: {
                mechanic_id: mechanicId
            }
        })
        const sum = invoicing._sum.value

        if (!sum) {
            return null
        }

        return { sum }
    }
}