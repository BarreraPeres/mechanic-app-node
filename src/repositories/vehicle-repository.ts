import { Prisma, Vehicle } from "@prisma/client";

export interface VehicleRepository {
    // create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle>
    findById(id: string, user_id: string): Promise<Vehicle | null> // change this to the vehicle repository
}