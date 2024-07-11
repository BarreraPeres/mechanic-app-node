import { beforeEach, describe, expect, it } from "vitest";
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


    })

    it("should create a issue order service ", async () => {
        schedulingRepository.create({
            id: "id_1",
            description: "“I need an oil change for my car",
            scheduled_for: "2024-07-9T04:12:12.000Z",
            type: "MAINTENANCE",
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })


        const { orderService } = await sut.execute({
            start_date: new Date("2024-07-10T04:12:12.000Z"), //new Date(),
            end_date: new Date("2024-07-10T05:12:12.000Z"),// new Date(),
            value: 100,
            description: "Oil change",
            mechanic_id: "id_1",
            scheduling_id: "id_1",
        })

        expect(orderService.id).toBeDefined()

    })


    it("should not be issue a order service with an appoinment ", async () => {
        schedulingRepository.create({
            id: "id_2",
            description: "“I need an oil change for my car",
            scheduled_for: "2024-07-09T04:12:12.000Z",
            type: "MAINTENANCE",
            request_at: "2024-07-05T04:12:12.000Z",
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })

        inMemoryOrderServiceRepository.create({
            scheduling_id: "id_2",
            mechanic_id: "id_1",
            description: "Oil change",
            end_date: "2024-07-09T04:12:12.000Z",
            status: "SCHEDULED",
            start_date: "2024-07-05T04:12:12.000Z",
            value: 100
        })

        await expect(() => sut.execute({
            description: "Oil change",
            mechanic_id: "id_1",
            end_date: new Date("2024-07-09T04:12:12.000Z"),
            scheduling_id: "id_2",
            start_date: new Date("2024-07-05T04:12:12.000Z"),
            value: 100
        })
        ).rejects.toBeInstanceOf(TimeNotAvailebleOrderServicesError)
    })


    it("should not be issue a order service with order service already issued", async () => {

        schedulingRepository.create({
            id: "id_2",
            description: "“I need an oil change for my car",
            scheduled_for: "2024-07-09T04:12:12.000Z",
            type: "MAINTENANCE",
            request_at: "2024-07-05T04:12:12.000Z",
            user_id: "user_1",
            vehicle_id: "vehicle_1",
            mechanic_id: "mechanic_1"
        })

        await sut.execute({
            scheduling_id: "id_2",
            description: "Oil change",
            mechanic_id: "id_1",
            start_date: new Date("2024-07-012T04:12:12.000Z"),
            end_date: new Date("2024-07-14T04:12:12.000Z"),
            value: 100
        })
        await
            await expect(() => sut.execute({
                scheduling_id: "id_2",
                description: "Oil change",
                mechanic_id: "id_1",
                start_date: new Date("2024-07-012T04:12:12.000Z"),
                end_date: new Date("2024-07-14T04:12:12.000Z"),
                value: 100
            })
            ).rejects.toBeInstanceOf(ScheduleAlreadyOrderIssuedError)
    })

    it("should not be issue a order service with a inexistent schedule", async () => {
        await expect(() =>
            sut.execute({
                start_date: new Date("2024-07-10T04:12:12.000Z"), //new Date(),
                end_date: new Date("2024-07-10T05:12:12.000Z"),// new Date(),
                value: 100,
                description: "Oil change",
                mechanic_id: "id_1",
                scheduling_id: "id_inexistent",
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })


})