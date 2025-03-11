import { $Enums, Mechanic, Prisma, Scheduling, Vehicle } from "@prisma/client";
import { SchedulingRepository } from "../scheduling-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class InMemoryScheduleRepository implements SchedulingRepository {

    public items: Scheduling[] = []
    private vehicles: Vehicle[] = [];
    private mechanics: Mechanic[] = [];

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

    async save(scheduleId: string, updateStatus: $Enums.Status) {
        const schedule = this.items.findIndex((item) => item.id === scheduleId)

        if (schedule >= 0) {
            this.items[schedule].status = updateStatus
            return this.items[schedule]
        }

        return null
    }

    async findManyByUserId(userId: String, page: number, status?: string) {
        if (status) {
            return this.items
                .filter(i => i.status === status)
                .slice(page * 10, (page + 1) * 10)
                .map(i => ({
                    ...i,
                    vehicle: this.vehicles.find(v => v.id === i.vehicle_id) || null,
                    mechanic: this.mechanics.find(m => m.id === i.mechanic_id) || null
                })) || null
        }
        else {
            return this.items
                .filter(item => item.user_id === userId)
                .slice(page * 10, (page + 1) * 10)
                .map(item => ({
                    ...item,
                    vehicle: this.vehicles.find(v => v.id === item.vehicle_id) || null,
                    mechanic: this.mechanics.find(m => m.id === item.mechanic_id) || null
                })) || null
        }
    }

    async getSchedulesTotalToday(userId: string) {
        const today = dayjs().add(-3, "hours").toDate()
        const tomorrow = dayjs().add(1, "day").toDate()
        const schedules = this.items.filter(item => {
            return (
                item.user_id === userId &&
                item.request_at >= today &&
                item.request_at <= tomorrow
            )
        }
        )
        console.log(this.items)
        const total = schedules.length

        if (!total) {
            return null
        }
        return { total }

    }

}