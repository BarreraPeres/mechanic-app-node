import { beforeEach, describe, expect, it } from "vitest";
import { SchedulingRepository } from "../repositories/scheduling-repository";
import { FetchSchedulingHistoryUseCases } from "./fetch-scheduling-history.use-cases";
import { InMemoryScheduleRepository } from "../repositories/in-memory/in-memory-scheduling-repository";

let schedulingRepository: SchedulingRepository
let sut: FetchSchedulingHistoryUseCases

describe("Fetch History Order-Service Use Case", async () => {
    beforeEach(() => {
        schedulingRepository = new InMemoryScheduleRepository()
        sut = new FetchSchedulingHistoryUseCases(schedulingRepository)
    })

    it("should be the fetch history", async () => {

        await schedulingRepository.create({
            id: "scheduling_1",
            description: "“I need an oil change for my car",
            scheduled_for: "2024-07-09T04:12:12.000Z",
            type: "MAINTENANCE",
            request_at: "2024-07-05T04:12:12.000Z",
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })
        await schedulingRepository.create({
            id: "scheduling_2",
            description: "“I need an oil change for my car",
            scheduled_for: "2024-07-09T04:12:12.000Z",
            type: "MAINTENANCE",
            request_at: "2024-07-05T04:12:12.000Z",
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })

        const { schedules } = await sut.execute({
            userId: "user_1",
        })

        expect(schedules).toHaveLength(2)
        expect(schedules).toEqual([
            expect.objectContaining({ id: "scheduling_1" }),
            expect.objectContaining({ id: "scheduling_2" })
        ])
    })

})