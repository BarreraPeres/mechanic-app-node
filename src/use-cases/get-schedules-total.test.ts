import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryScheduleRepository } from "../repositories/in-memory/in-memory-scheduling-repository";
import { GetSchedulesTotalUseCases } from "./get-schedules-total";

let schedulingRepository: InMemoryScheduleRepository
let sut: GetSchedulesTotalUseCases

describe("Fetch History Order-Service Use Case", async () => {
    beforeEach(() => {
        schedulingRepository = new InMemoryScheduleRepository
        sut = new GetSchedulesTotalUseCases(schedulingRepository)
    })

    it("should be get schedules total in same day", async () => {

        schedulingRepository.items.push({
            id: "scheduling_1",
            description: "“I need an oil change for my car",
            scheduled_for: new Date(),
            type: "MAINTENANCE",
            request_at: new Date(),
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            status: "PENDING",
            mechanic_id: "mechanic_1"
        })
        schedulingRepository.items.push({
            id: "scheduling_1",
            description: "“I need an oil change for my car",
            scheduled_for: new Date(),
            type: "MAINTENANCE",
            request_at: new Date("2025-01-09T04:12:12.000Z"),
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            status: "PENDING",
            mechanic_id: "mechanic_1"
        })

        const { total } = await sut.execute({
            userId: "user_1",
        })

        expect(total).toEqual(1)
    })

})