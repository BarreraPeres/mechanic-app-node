import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IssueServiceUseCases } from "./issue-order-service.use-case";
import { InMemoryOrderServiceRepository } from "../repositories/in-memory/in-memory-order-service-repository";
import { InMemoryScheduleRepository } from "../repositories/in-memory/in-memory-scheduling-repository";
import { TimeNotAvailebleOrderServicesError } from "./errors/time-not-avalieble-order-services-error";
import { ScheduleAlreadyOrderIssuedError } from "./errors/schedule-already-order-issued-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";



let schedulingRepository: InMemoryScheduleRepository
let inMemoryOrderServiceRepository: InMemoryOrderServiceRepository
let sut: IssueServiceUseCases


describe("Issue Order Service Use Case", async () => {
    beforeEach(() => {
        schedulingRepository = new InMemoryScheduleRepository()

        inMemoryOrderServiceRepository = new InMemoryOrderServiceRepository()
        sut = new IssueServiceUseCases(inMemoryOrderServiceRepository, schedulingRepository)

        vi.useFakeTimers()
    })
    afterEach(() => {
        vi.useRealTimers()
    })

    it("should create a issue order service ", async () => {
        vi.setSystemTime(new Date(2024, 5, 8, 0, 0,))

        schedulingRepository.create({
            id: "id_1",
            description: "“I need an oil change for my car",
            scheduled_for: new Date(2024, 5, 8, 0, 0,),
            type: "MAINTENANCE",
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })


        const { orderService } = await sut.execute({
            start_date: new Date(2024, 5, 8, 4, 0,),
            end_date: new Date(2024, 5, 8, 5, 0,),
            value: 100,
            description: "Oil change",
            mechanic_id: "id_1",
            scheduling_id: "id_1",
        })

        expect(orderService.id).toBeDefined()

    })


    it("should not be issue a order service with an appoinment ", async () => {
        vi.setSystemTime(new Date(2024, 5, 8, 0, 0,))

        schedulingRepository.create({
            id: "id_2",
            description: "“I need an oil change for my car",
            scheduled_for: new Date(2024, 5, 8, 5, 0,),
            type: "MAINTENANCE",
            request_at: new Date(),
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })

        inMemoryOrderServiceRepository.create({
            scheduling_id: "id_2",
            mechanic_id: "id_1",
            description: "Oil change",
            start_date: new Date(2024, 5, 8, 5, 0,),
            end_date: new Date(2024, 5, 8, 6, 0,),
            status: "SCHEDULED",
            vehicle_id: "vehicle_id",
            value: 100
        })

        await expect(() => sut.execute({
            description: "Oil change",
            mechanic_id: "id_1",
            end_date: new Date(2024, 5, 8, 5, 0,),
            scheduling_id: "id_2",
            start_date: new Date(2024, 5, 8, 6, 0,),
            value: 100
        })
        ).rejects.toBeInstanceOf(TimeNotAvailebleOrderServicesError)
    })


    it("should not be issue a order service with order service already issued", async () => {
        schedulingRepository.create({
            id: "id_2",
            description: "“I need an oil change for my car",
            scheduled_for: new Date(2024, 5, 8, 5, 0,),
            type: "MAINTENANCE",
            request_at: new Date(),
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })

        await sut.execute({
            scheduling_id: "id_2",
            description: "Oil change",
            mechanic_id: "id_1",
            start_date: new Date(2024, 5, 8, 5, 0,),
            end_date: new Date(2024, 5, 8, 5, 0,),
            value: 100
        })

        await expect(() => sut.execute({
            scheduling_id: "id_2",
            description: "Oil change",
            mechanic_id: "id_1",
            start_date: new Date(2024, 5, 9, 5, 0,),
            end_date: new Date(2024, 5, 9, 5, 0,),
            value: 100
        })
        ).rejects.toBeInstanceOf(ScheduleAlreadyOrderIssuedError)
    })

    it("should not be issue a order service with a inexistent schedule", async () => {
        await expect(() =>
            sut.execute({
                start_date: new Date(2024, 5, 8, 5, 0,),
                end_date: new Date(2024, 5, 8, 6, 0,),
                value: 100,
                description: "Oil change",
                mechanic_id: "id_1",
                scheduling_id: "id_inexistent",
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it("should not be issue order with hour end before start", async () => {
        schedulingRepository.create({
            id: "id_2",
            description: "“I need an oil change for my car",
            scheduled_for: new Date(2024, 5, 8, 5, 0,),
            type: "MAINTENANCE",
            request_at: new Date(),
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })


        await expect(() =>
            sut.execute({
                start_date: new Date(2024, 5, 8, 5, 0,),
                end_date: new Date(2024, 5, 7, 6, 0,),
                value: 100,
                description: "Oil change",
                mechanic_id: "id_1",
                scheduling_id: "id_2",
            })
        ).rejects.toBeInstanceOf(TimeNotAvailebleOrderServicesError)
    })

})