import { prisma } from "../config/prisma";
import "dotenv/config"
async function seed() {
    await prisma.user.createMany({
        data: [
            {
                id: "mechanic_1",
                cpf: "1234562",
                email: "samel@gmail.com",
                name: "samel",
                password_hash: "123456",
                role: "BOSS"
            },
            {
                id: "user_1",
                cpf: "12345623",
                email: "gabrieu@gmail.com",
                name: "gabrieu",
                password_hash: "123456",
            },
        ],
        skipDuplicates: true
    })

    await prisma.mechanic.createMany({
        data: [
            {
                id: "mechanic_1",
                name: "Problemao",
                phone: "123456",
                latitude: -23.2984851,
                longitude: -45.9422097
            },
            {
                name: "Ativadao",
                phone: "123456",
                latitude: -23.298080,
                longitude: -45.945170
            },
            {
                name: "Pragmática",
                phone: "123456",
                latitude: -23.295794,
                longitude: -45.940149
            }
        ],
        skipDuplicates: true
    })

    await prisma.vehicle.createMany({
        data: [
            {
                id: "vehicle_1",
                model: "gol",
                plate: "plate-1",
                brand: "volkswagen",
                user_id: "user_1",
                year: 1999,
            },
        ]
    })

    await prisma.scheduling.createMany({
        data: [
            {
                id: "scheduling_1",
                description: "“I need an oil change for my car",
                scheduled_for: new Date(2025, 1, 31, 0, 0,),//new Date("2025-01-131T05:11:131.000Z"),
                type: "MAINTENANCE",
                user_id: "user_1",
                vehicle_id: "vehicle_1",
                mechanic_id: "mechanic_1"
            },
            {
                description: "I need change my car",
                scheduled_for: new Date(2025, 1, 31, 0, 0,),//new Date("2025-01-131T05:11:131.000Z"),
                type: "INSPECTION",
                user_id: "user_1",
                vehicle_id: "vehicle_1",
                mechanic_id: "mechanic_1"
            },
            {
                description: "I need change my volant he broke",
                scheduled_for: new Date(2025, 1, 31, 0, 0,),//new Date("2025-01-131T04:12:12.000Z"),
                type: "REPAIR",
                user_id: "user_1",
                vehicle_id: "vehicle_1",
                mechanic_id: "mechanic_1"
            }
        ],
        skipDuplicates: true
    })

    await prisma.orderService.create({
        data: {
            start_date: new Date(2024, 5, 8, 4, 0,),
            end_date: new Date(2024, 5, 8, 5, 0,),
            value: 100,
            description: "Oil change",
            mechanic_id: "mechanic_1",
            scheduling_id: "scheduling_1",
            vehicle_id: "vehicle_1"
        }
    })
}

seed().then(() => {
    console.log("seeded! 🐉")
    prisma.$disconnect
})