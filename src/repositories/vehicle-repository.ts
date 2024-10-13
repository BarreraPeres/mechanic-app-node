import { Prisma, Vehicle } from "@prisma/client";

export interface VehicleRepository {
    create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle>
    findById(id: string, user_id: string): Promise<Vehicle | null>
    findByPlate(plate: string): Promise<Vehicle | null>
    findManyById(user_id: string): Promise<Vehicle[] | null>
}