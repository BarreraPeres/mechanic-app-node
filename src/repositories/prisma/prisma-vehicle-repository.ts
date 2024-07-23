import { Prisma, Vehicle } from "@prisma/client";
import { VehicleRepository } from "../vehicle-repository";
import { prisma } from "../../config/prisma";

export class PrismaVehicleRepository implements VehicleRepository {
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
    async findById(id: string, user_id: string) {
        const vehicle = await prisma.vehicle.findUnique({
            where: {
                id,
                user_id
            }
        })
        return vehicle
    }

}