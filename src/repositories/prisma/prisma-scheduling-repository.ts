import { $Enums, Prisma, Scheduling } from "@prisma/client";
import { SchedulingRepository } from "../scheduling-repository";
import { prisma } from "../../config/prisma";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import ptBR from 'dayjs/locale/pt-br'

dayjs.locale(ptBR)
dayjs.extend(utc);


export class PrismaSchedulingRepository implements SchedulingRepository {
    async create(data: Prisma.SchedulingUncheckedCreateInput) {
        const scheduling = prisma.scheduling.create({
            data
        })
        return scheduling
    }

    async findUniqueById(id: string) {
        const scheduling = await prisma.scheduling.findUnique({
            where: {
                id
            }
        })
        return scheduling
    }


    async findConflictingSchedule(scheduledDate: Date, status: $Enums.Status) {
        const conflictingSchedule = prisma.scheduling.findFirst({
            where: {
                scheduled_for: scheduledDate,
                status
            }
        })
        return conflictingSchedule
    }

    async save(scheduleId: string, updateStatus: $Enums.Status) {
        const response = await prisma.scheduling.update({
            where: { id: scheduleId },
            data: {
                status: updateStatus
            }
        })
        if (!response) {
            throw new Error()
        }

        return response
    }

    async findManyByUserId(userId: string, page: number, status?: $Enums.Status) {
        if (status) {
            const shedules = await prisma.scheduling.findMany({
                where: {
                    user_id: userId,
                    status: status
                },
                include: {
                    mechanic: true,
                    vehicle: true,
                },
                take: 10,
                skip: page * 10
            })
            if (!shedules) {
                return null
            }
            return shedules
        } else {
            const shedules = await prisma.scheduling.findMany({
                where: {
                    user_id: userId
                },
                include: {
                    mechanic: true,
                    vehicle: true,
                },
                take: 10,
                skip: page * 10
            })
            if (!shedules) {
                return null
            }
            return shedules
        }
    }

    async getSchedulesTotalToday(userId: string) {
        const today = dayjs().add(-3, "hours").toDate()
        const tomorrow = dayjs().add(1, "day").toDate()

        const total = await prisma.scheduling.count({
            where: {
                user_id: userId,
                request_at: {
                    gte: today,
                    lte: tomorrow
                }
            }
        })

        if (!total) {
            return null
        }

        return { total }
    }

}