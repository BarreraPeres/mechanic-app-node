
import { Prisma, OrderService } from "@prisma/client";
import { OrderServiceRepository } from "../order-service-repository";
import { randomUUID } from "crypto";

export class InMemoryOrderServiceRepository implements OrderServiceRepository {

    public items: OrderService[] = []

    async create(data: Prisma.OrderServiceUncheckedCreateInput) {
        const orderService = {
            id: data.id ?? randomUUID(),
            created_at: new Date(),
            status: data.status ?? "PENDING",
            value: data.value ?? 0,
            materials: data.materials || null,
            description: data.description ?? null,
            start_date: new Date(data.start_date),
            end_date: new Date(data.end_date),
            scheduling_id: data.scheduling_id ?? null,
            mechanic_id: data.mechanic_id ?? null
        }
        this.items.push(orderService)
        return orderService
    }

    async findByDate(start_date: Date, end_date: Date) {
        return this.items.filter(item => {
            const orderStart = new Date(item.start_date)
            const orderEnd = new Date(item.end_date)

            return (orderStart <= end_date && orderEnd >= start_date);

        })
    }

    async findSchedulingExisting(scheduling_id: string) {
        const scheduleAlreadyIssued = this.items.find(item => item.scheduling_id === scheduling_id) || null
        return scheduleAlreadyIssued
    }

    async save(schedulingId: string, UpdateStatus: string) {
        const order = this.items.findIndex((item) => item.scheduling_id === schedulingId)

        if (order >= 0) {
            this.items[order].status = UpdateStatus
            return this.items[order]
        }
        return null


    }


}

