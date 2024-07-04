import { Prisma, Scheduling } from "@prisma/client";

export interface SchedulingRepository {
    create(data: Prisma.SchedulingUncheckedCreateInput): Promise<Scheduling>
    findConflictingSchedule(scheduledDate: Date, status: string): Promise<Scheduling | null>
    findUniqueById(id: string): Promise<Scheduling | null>

}
