import { Mechanic, Prisma } from "@prisma/client";

export interface MechanicRepository {
    create(data: Prisma.MechanicCreateInput): Promise<Mechanic>
    findById(mechanicId: string): Promise<Mechanic | null>
}