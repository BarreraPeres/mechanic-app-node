import { beforeEach, describe, expect, it } from "vitest";
import { SchedulingUseCases } from "./create-scheduling.use-case";
import { InMemoryScheduleRepository } from "../repositories/in-memory/in-memory-scheduling-repository";
import { ScheduledTimeExistsError } from "./errors/scheduled-time-exists-error";
import { InMemoryVehicleRepository } from "../repositories/in-memory/in-memory-vehicle-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryMechanicRepository } from "../repositories/in-memory/in-memory-mechanic-repository";
import { Decimal } from "@prisma/client/runtime/library";

let vehicleRepository: InMemoryVehicleRepository
let schedulingRepository: InMemoryScheduleRepository
let mechanicRepository: InMemoryMechanicRepository
let sut: SchedulingUseCases

describe("Create Scheduling Use Case", async () => {
    beforeEach(() => {
        vehicleRepository = new InMemoryVehicleRepository()
        schedulingRepository = new InMemoryScheduleRepository()
        mechanicRepository = new InMemoryMechanicRepository()
        sut = new SchedulingUseCases(schedulingRepository, vehicleRepository, mechanicRepository)

        vehicleRepository.items.push({
            id: "vehicle_1",
            model: "gol",
            plate: "plate-1",
            user_id: "user_1",
            year: 1999
        })

        mechanicRepository.items.push({
            id: "mechanic_id",
            name: "mechanic",
            phone: "",
            latitude: new Decimal("-23.2978352"),
            longitude: new Decimal("-45.9452438"),
        })

    })

    it("should be create sheduling", async () => {
        const { scheduling } = await sut.execute({
            description: "“I need an oil change for my car",
            scheduled_for: new Date("2024-06-18T04:12:12.000Z"),
            type: "MAINTENANCE",
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_id"
        })

        expect(scheduling.user_id).toBeDefined()
    })


    it("should not be possible request a an appointment in at the scheduled time", async () => {
        await schedulingRepository.create({
            id: "id_1",
            description: "“I need an oil change for my car",
            scheduled_for: new Date("2024-07-05T03:18:16.704Z"),
            type: "MAINTENANCE",
            status: "SCHEDULED",
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })

        await expect(() =>
            sut.execute({
                description: "spark plug replacement",
                scheduled_for: new Date("2024-07-05T03:18:16.704Z"),
                type: "MAINTENANCE",
                user_id: "user_1",
                vehicle_id: "vehicle_1",
                mechanic_id: "mechanic_id"
            }),
        ).rejects.toBeInstanceOf(ScheduledTimeExistsError)
    })


    it("should not be possible create an appoinment a inexistent vehicle", async () => {

        await expect(() =>
            sut.execute({
                description: "spark plug replacement",
                scheduled_for: new Date("2024-07-05T03:18:16.704Z"),
                type: "MAINTENANCE",
                user_id: "user_1",
                mechanic_id: "mechanic_id",
                vehicle_id: "vehicle_inexistent",
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })


    it("should not be possible create an appoinment a inexistent mechanic", async () => {

        await expect(() =>
            sut.execute({
                description: "spark plug replacement",
                scheduled_for: new Date("2024-07-05T03:18:16.704Z"),
                type: "MAINTENANCE",
                user_id: "user_1",
                mechanic_id: "mechanic_inexistent",
                vehicle_id: "vehicle_1",
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})
