import { Prisma, Scheduling } from "@prisma/client";
import { SchedulingRepository } from "../scheduling-repository";
import { randomUUID } from "crypto";


export class InMemoryScheduleRepository implements SchedulingRepository {

    public items: Scheduling[] = []

    async create(data: Prisma.SchedulingUncheckedCreateInput) {
        const scheduling = {
            id: data.id ?? randomUUID(),
            request_at: new Date(),
            scheduled_for: new Date(data.scheduled_for),
            status: data.status ?? "PENDING",
            description: data.description,
            type: data.type,
            user_id: data.user_id,
            vehicle_id: data.user_id,
            mechanic_id: data.mechanic_id ?? null,
        }
        this.items.push(scheduling)

        return scheduling
    }

    async findUniqueById(id: string): Promise<Scheduling | null> {
        const scheduling = this.items.find(schedule => schedule.id === id) || null

        return scheduling
    }

    async findConflictingSchedule(scheduledDate: Date, status: string) {
        const conflictingSchedule = this.items.find(schedule =>
            schedule.scheduled_for.getTime() === scheduledDate.getTime() &&
            schedule.status === status
        ) || null

        return conflictingSchedule

    }

    async save(scheduleId: string, updateStatus: string) {
        const schedule = this.items.findIndex((item) => item.id === scheduleId)

        if (schedule >= 0) {
            this.items[schedule].status = updateStatus
            return this.items[schedule]
        }

        return null


    }


}