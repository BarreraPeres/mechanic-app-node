import { FastifyInstance } from "fastify"
import { prisma } from "../config/prisma"

export async function CreateVehicleAndMechanicTest(app: FastifyInstance) {

    const user = await prisma.user.findFirstOrThrow()

    const vehicle = await prisma.vehicle.create({
        data: {
            model: "gol",
            plate: "cis-9999",
            user_id: user.id,
            year: 1999
        }
    })

    const mechanic = await prisma.mechanic.create({
        data: {
            latitude: -23.3037956,
            longitude: -45.9712603,
            name: "Mechanic Javascript",
            phone: "phone"
        }
    })


    return {
        mechanic, vehicle
    }
}