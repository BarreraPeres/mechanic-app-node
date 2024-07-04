import { Prisma, Vehicle } from "@prisma/client";
import { VehicleRepository } from "../vehicle-repository";
import { prisma } from "../../config/prisma";

export class PrismaVehicleRepository implements VehicleRepository {
    // create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle> {
    //     throw new Error("Method not implemented.");
    // }
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