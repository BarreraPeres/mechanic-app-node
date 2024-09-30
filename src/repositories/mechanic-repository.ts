import { Mechanic, Prisma } from "@prisma/client";

export interface FindManyNearbyParms {
    latitude: number
    longitude: number
}

export interface MechanicRepository {
    create(data: Prisma.MechanicUncheckedCreateInput): Promise<Mechanic>
    findById(mechanicId: string): Promise<Mechanic | null>
    searchMany(query: string | undefined | null, page: number): Promise<Mechanic[]>
    findManyNearby(parms: FindManyNearbyParms): Promise<Mechanic[]>
}