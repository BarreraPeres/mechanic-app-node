
import { describe, expect, it, beforeEach } from "vitest";
import { ResponseSchedulingUseCases } from "./responder-scheduling.use-case";
import { InMemoryScheduleRepository } from "../repositories/in-memory/in-memory-scheduling-repository";
import { InMemoryOrderServiceRepository } from "../repositories/in-memory/in-memory-order-service-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let orderService: InMemoryOrderServiceRepository
let schedulingRepository: InMemoryScheduleRepository
let sut: ResponseSchedulingUseCases

describe("Responder Scheduling Use Cases", async () => {
    beforeEach(() => {
        orderService = new InMemoryOrderServiceRepository()
        schedulingRepository = new InMemoryScheduleRepository()
        sut = new ResponseSchedulingUseCases(schedulingRepository, orderService)

        schedulingRepository.create({
            id: "scheduling_id",
            description: "“I need an oil change for my car",
            scheduled_for: new Date("2024-06-18T04:12:12.000Z"),
            type: "MAINTENANCE",
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_id"
        })

        orderService.create({
            start_date: new Date("2024-07-10T04:12:12.000Z"), //new Date(),
            end_date: new Date("2024-07-10T05:12:12.000Z"),// new Date(),
            value: 100,
            description: "Oil change",
            mechanic_id: "mechanic_id",
            scheduling_id: "scheduling_id",
        })
    })

    it("should be update status when user accepted", async () => {
        const response = await sut.execute({
            accepted: true,
            id: "scheduling_id"
        })

        expect(response.status).toEqual("SCHEDULED")
    })

    it("should update status to rejected when user does not accept", async () => {

        const response = await sut.execute({
            accepted: false,
            id: "scheduling_id"
        })

        expect(response.status).toEqual("REJECTED")
    })

    it("should be not possible to response with inexistent schedule", async () => {
        await expect(() =>
            sut.execute({
                accepted: true,
                id: "id_inexistent"
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})


