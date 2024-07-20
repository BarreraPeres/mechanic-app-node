import { OrderService, Prisma } from "@prisma/client";

export interface OrderServiceRepository {
    create(data: Prisma.OrderServiceUncheckedCreateInput): Promise<OrderService>
    findByDate(startDate: Date, endDate: Date): Promise<OrderService[]>;
    findSchedulingExisting(scheduling_id: string): Promise<OrderService | null>
    save(schedulingId: string, UpdateStatus: string): Promise<OrderService | null>
    findManyByMechanicId(mechanicId: string): Promise<OrderService[] | null>
}

