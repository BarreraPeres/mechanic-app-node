import { Mechanic, Prisma } from "@prisma/client";

export interface FindManyNearbyParms {
    latitude: number
    longitude: number
}

export interface MechanicRepository {
    create(data: Prisma.MechanicCreateInput): Promise<Mechanic>
    findById(mechanicId: string): Promise<Mechanic | null>
    searchMany(query: string, page: number): Promise<Mechanic[]>
    findManyNearby(parms: FindManyNearbyParms): Promise<Mechanic[]>
}