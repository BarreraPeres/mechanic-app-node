import { Prisma, Mechanic } from "@prisma/client";
import { FindManyNearbyParms, MechanicRepository } from "../mechanic-repository";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-between-coordinates";

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
        const mechanic = this.items.find((item) => item.id === mechanicId) || null

        return mechanic
    }

    async searchMany(query: string, page: number) {

        return this.items
            .filter(item => item.name.includes(query))
            .slice(page * 10, (page + 1) * 10)
    }

    async findManyNearby(parms: FindManyNearbyParms) {
        return this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: parms.latitude, longitude: parms.longitude },
                { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() }
            )
            return distance < 10
        })
    }
}
