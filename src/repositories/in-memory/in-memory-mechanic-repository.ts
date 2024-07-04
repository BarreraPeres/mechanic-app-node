import { Prisma, Mechanic } from "@prisma/client";
import { MechanicRepository } from "../mechanic-repository";
import { randomUUID } from "crypto";

export class InMemoryMechanicRepository implements MechanicRepository {
    public items: Mechanic[] = []

    async create(data: Prisma.MechanicCreateInput) {
        const mechanic = {
            id: data.id || randomUUID(),
            name: data.name,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            schedules: data.schedules,
            order_services: data.order_services
        }
        this.items.push(mechanic)
        return mechanic
    }


    async findById(mechanicId: string) {
        const mechanic = await this.items.find((item) => item.id === mechanicId) || null

        return mechanic
    }

}
