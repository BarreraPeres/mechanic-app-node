
import { $Enums, OrderService, Vehicle } from "@prisma/client";
import { OrderServiceCreateTypeWithVehicle, OrderServiceRepository } from "../order-service-repository";
import { randomUUID } from "crypto";




export class InMemoryOrderServiceRepository implements OrderServiceRepository {

    public items: OrderService[] = []
    public vehicles: Vehicle[] = []

    async create(data: OrderServiceCreateTypeWithVehicle) {
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
            mechanic_id: data.mechanic_id ?? null,
            vehicle_id: data.vehicle_id ?? null,
            vehicle: data.vehicle ?? null,
        }
        this.items.push(orderService)
        if (data.vehicle) {
            this.vehicles.push(data.vehicle)
        }
        return orderService
    }

    async findById(id: string) {
        const orderService = this.items.find(item => item.id === id) || null

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

    async save(schedulingId: string, UpdateStatus: $Enums.Status) {
        const order = this.items.findIndex((item) => item.scheduling_id === schedulingId)

        if (order >= 0) {
            this.items[order].status = UpdateStatus
            return this.items[order]
        }
        return null


    }

    async findManyByMechanicId(mechanicId: string, page: number, status?: string) {
        let orderService
        if (status) {
            orderService =
                this.items.filter(item => item.status === status)
                    .slice(page * 10, (page + 1) * 10)
                    .map(item => ({
                        ...item,
                        vehicle: this.vehicles.find(v => v.id === item.vehicle_id) || null
                    }))
                || null

            return orderService
        }
        orderService =
            this.items.filter(item => item.mechanic_id === mechanicId)
                .slice(page * 10, (page + 1) * 10)
                .map(item => ({
                    ...item,
                    vehicle: this.vehicles.find(v => v.id === item.vehicle_id) || null
                }))
            || null
        return orderService
    }

    async findManyByVehicleId(vehicleId: string, page: number) {
        return this.items
            .filter(item => item.vehicle_id === vehicleId)
            .slice(page * 10, (page + 1) * 10)
    }

}

