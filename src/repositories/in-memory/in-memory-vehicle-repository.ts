import { Prisma, Vehicle } from "@prisma/client";
import { VehicleRepository } from "../vehicle-repository";
import { randomUUID } from "crypto";

export class InMemoryVehicleRepository implements VehicleRepository {
    public items: Vehicle[] = []

    async create(data: Prisma.VehicleUncheckedCreateInput) {
        const vehicle = {
            id: data.id ?? randomUUID(),
            plate: data.plate,
            model: data.model,
            year: data.year,
            brand: data.brand,
            user_id: data.user_id || randomUUID().toString()
        }
        this.items.push(vehicle)

        return vehicle
    }

    async findById(id: string, user_id: string) {
        const vehicle = this.items.find(item => item.id === id && item.user_id === user_id) || null
        return vehicle
    }

    async findByPlate(plate: string) {
        const vehicle = this.items.find(item => item.plate === plate) || null

        return vehicle
    }
    async findManyById(user_id: string) {
        const vehicles = this.items.filter((vehicle) => vehicle.user_id === user_id) || null

        return vehicles
    }


}