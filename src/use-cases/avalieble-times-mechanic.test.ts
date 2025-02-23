
import { it, beforeEach, describe, expect, beforeAll, afterEach, vi } from "vitest";
import { InMemoryMechanicRepository } from "../repositories/in-memory/in-memory-mechanic-repository";
import { InMemoryOrderServiceRepository } from "../repositories/in-memory/in-memory-order-service-repository";
import { AvaliebleUseCase } from "./avalieble-times-mechanic.use-case";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


let mechanicRepository: InMemoryMechanicRepository
let orderServiceRepository: InMemoryOrderServiceRepository
let sut: AvaliebleUseCase

describe("Avalieble Times Mechanic Use Case", async () => {

    beforeEach(() => {
        mechanicRepository = new InMemoryMechanicRepository
        orderServiceRepository = new InMemoryOrderServiceRepository
        sut = new AvaliebleUseCase(mechanicRepository, orderServiceRepository)

        vi.useFakeTimers()

        mechanicRepository.create({
            id: "mechanic_id",
            name: "mechanic",
            phone: "",
            latitude: ("-23.2978352"),
            longitude: ("-45.9452438"),
        })

        orderServiceRepository.create({
            scheduling_id: "id_2",
            description: "Oil change",
            mechanic_id: "id_1",
            vehicle_id: "vehicle_id",
            start_date: new Date("2024-07-012T04:12:12.000Z"),
            end_date: new Date("2024-07-14T04:12:12.000Z"),
            value: 100
        })

    })

    afterEach(() => {
        vi.useRealTimers()
    })
    it("Should be show the hours avalieble", async () => {
        const { avaliebleTimes } = await sut.execute({
            mechanicId: "mechanic_id",
            page: 0
        })
        expect(avaliebleTimes).toEqual([
            "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
            "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
            "16:00", "16:30", "17:00", "17:30"
        ])
    })


    it("should not be possible appear scheduled times", async () => {
        vi.setSystemTime(new Date(2024, 6, 18, 8, 0, 0))

        orderServiceRepository.items.push({
            scheduling_id: "id_2",
            description: "Oil change",
            mechanic_id: "mechanic_id",
            vehicle_id: "vehicle_Id",
            start_date: new Date(2024, 6, 18, 8, 0, 0),
            end_date: new Date(2024, 6, 18, 10, 0, 0),
            value: 100,
            created_at: new Date(2024, 6, 18, 8, 0, 0),
            id: "id_1",
            materials: "",
            status: "SHEDULED"
        })

        const { avaliebleTimes } = await sut.execute({
            mechanicId: "mechanic_id",
            page: 0
        })

        expect(avaliebleTimes).toEqual([
            "10:00", "10:30", "11:00", "11:30",
            "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
            "16:00", "16:30", "17:00", "17:30"
        ])
    })

    it("should not be possible to availble time with mechanic inexistent", async () => {

        await expect(() => sut.execute({
            mechanicId: "mechanic_inexistent",
            page: 0
        })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})