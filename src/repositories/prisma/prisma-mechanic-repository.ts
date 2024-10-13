import { Mechanic, Prisma } from "@prisma/client";
import { FindManyNearbyParms, MechanicRepository } from "../mechanic-repository";
import { prisma } from "../../config/prisma";
import { randomUUID } from "node:crypto";


export class PrismaMechanicRepository implements MechanicRepository {
    async create(data: Prisma.MechanicCreateInput) {
        const mechanic = await prisma.mechanic.create({
            data: {
                latitude: data.latitude,
                longitude: data.longitude,
                phone: data.phone,
                name: data.name,
                employees: data.employees,
                id: data.id || randomUUID()
            }
        });
        return mechanic
    }


    async findById(mechanicId: string) {
        const mechanic = await prisma.mechanic.findUnique({
            where: {
                id: mechanicId
            }
        })

        return mechanic
    }

    async searchMany(query: string, page: number) {
        const mechanics = await prisma.mechanic.findMany({
            where: {
                name: {
                    contains: query
                },

            },
            include: {
                employees: {
                    select: {
                        name: true,
                        id: true,
                        role: true
                    }
                }
            },
            take: 10,
            skip: page * 10
        })

        return mechanics
    }

    async findManyNearby({ latitude, longitude }: FindManyNearbyParms) {
        const mechanics = await prisma.$queryRaw<Mechanic[]>`
        SELECT * FROM mechanics
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return mechanics
    }



}