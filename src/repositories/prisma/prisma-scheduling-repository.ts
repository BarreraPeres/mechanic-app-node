import { Prisma, Scheduling } from "@prisma/client";
import { SchedulingRepository } from "../scheduling-repository";
import { prisma } from "../../config/prisma";

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


    async findConflictingSchedule(scheduledDate: Date, status: string) {
        const conflictingSchedule = prisma.scheduling.findFirst({
            where: {
                scheduled_for: scheduledDate,
                status
            }
        })
        return conflictingSchedule
    }

    async save(scheduleId: string, updateStatus: string) {
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

    async findManyByUserId(userId: string) {
        const shedules = await prisma.scheduling.findMany({
            where: {
                user_id: userId
            }
        })
        return shedules
    }



}