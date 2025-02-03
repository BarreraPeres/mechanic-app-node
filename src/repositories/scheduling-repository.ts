import { Prisma, Scheduling } from "@prisma/client";


export type SchedulingResponseType = {
    id: string;
    request_at: Date;
    status: string;
    scheduled_for: Date;
    type: 'REPAIR' | 'MAINTENANCE' | 'INSPECTION',
    description: string;
    user_id: string;
    vehicle: {
        id: string,
        model: string,
        plate: string,
        year: number,
        user_id: string,
    } | null;
    mechanic: {
        id: string,
        name: string,
        phone: string | null,
        latitude: Prisma.Decimal;
        longitude: Prisma.Decimal
    } | null;
}

export interface SchedulingRepository {
    create(data: Prisma.SchedulingUncheckedCreateInput): Promise<Scheduling>
    findConflictingSchedule(scheduledDate: Date, status: string): Promise<Scheduling | null>
    findUniqueById(id: string): Promise<Scheduling | null>
    save(scheduleId: string, updateStatus: string): Promise<Scheduling | null>
    findManyByUserId(userId: string): Promise<SchedulingResponseType[]>
}
