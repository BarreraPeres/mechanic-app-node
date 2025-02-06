import { Prisma, Vehicle } from "@prisma/client";
import { VehicleRepository } from "../vehicle-repository";
import { prisma } from "../../config/prisma";

export class PrismaVehicleRepository implements VehicleRepository {
    async update(v: Vehicle): Promise<Vehicle> {
        const vehicle = await prisma.vehicle.update({
            where: {
                id: v.id
            },
            data: {
                plate: v.plate,
                model: v.model,
                year: v.year,
                brand: v.brand
            }
        })
        return vehicle
    }
    async create(data: Prisma.VehicleUncheckedCreateInput) {
        const vehicle = await prisma.vehicle.create({
            data
        })
        return vehicle
    }
    async findByPlate(plate: string) {
        const vehicle = await prisma.vehicle.findUnique({
            where: {
                plate
            }
        })
        return vehicle
    }
    async findById(id: string) {
        const vehicle = await prisma.vehicle.findUnique({
            where: {
                id
            }
        })
        return vehicle
    }
    async findManyById(user_id: string) {
        const vehicles = await prisma.vehicle.findMany({
            where: {
                user_id
            }
        })
        if (!vehicles) {
            return null
        }
        return vehicles
    }

}