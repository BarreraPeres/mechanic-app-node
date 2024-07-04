import { Mechanic, Prisma } from "@prisma/client";
import { MechanicRepository } from "../mechanic-repository";
import { prisma } from "../../config/prisma";


export class PrismaMechanicRepository implements MechanicRepository {

    async create(data: Prisma.MechanicCreateInput) {
        const mechanic = await prisma.mechanic.create({
            data
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


}