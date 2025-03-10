import { beforeEach, describe, expect, it } from "vitest";
import { SchedulingRepository } from "../repositories/scheduling-repository";
import { InMemoryScheduleRepository } from "../repositories/in-memory/in-memory-scheduling-repository";
import { GetSchedulesTotalUseCases } from "./get-schedules-total";

let schedulingRepository: SchedulingRepository
let sut: GetSchedulesTotalUseCases

describe("Fetch History Order-Service Use Case", async () => {
    beforeEach(() => {
        schedulingRepository = new InMemoryScheduleRepository()
        sut = new GetSchedulesTotalUseCases(schedulingRepository)
    })

    it("should be get schedules total total", async () => {

        await schedulingRepository.create({
            id: "scheduling_1",
            description: "“I need an oil change for my car",
            scheduled_for: new Date(),
            type: "MAINTENANCE",
            request_at: new Date(),
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })
        await schedulingRepository.create({
            id: "scheduling_2",
            description: "“I need an oil change for my car",
            scheduled_for: new Date(),
            type: "MAINTENANCE",
            request_at: new Date(),
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })

        const { total } = await sut.execute({
            userId: "user_1",
        })
        expect(total).toEqual(2)
    })

})