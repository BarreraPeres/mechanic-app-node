import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrderServiceRepository } from "../repositories/in-memory/in-memory-order-service-repository";
import { OrderServiceRepository } from "../repositories/order-service-repository";
import { InMemoryScheduleRepository } from "../repositories/in-memory/in-memory-scheduling-repository";
import { SchedulingRepository } from "../repositories/scheduling-repository";
import { GetOrderServiceByIdUseCase } from "./get-order-service-by-id";

let orderServiceRepository: OrderServiceRepository
let schedulingRepository: SchedulingRepository
let sut: GetOrderServiceByIdUseCase

describe("get Order-Service by id Use Case", async () => {
    beforeEach(() => {
        orderServiceRepository = new InMemoryOrderServiceRepository()
        schedulingRepository = new InMemoryScheduleRepository()
        sut = new GetOrderServiceByIdUseCase(orderServiceRepository)
    })

    it("should be the get order service", async () => {

        await orderServiceRepository.create({
            id: "order_service_1",
            mechanic_id: "mechanic_1",
            scheduling_id: "scheduling_1",
            description: "need change oil for car",
            end_date: "2025-07-09T06:12:30.000Z",
            start_date: "2025-07-09T05:12:12.000Z",
            value: 100,
            vehicle_id: "vehicle_1",
        })
        await orderServiceRepository.create({
            id: "order_service_2",
            mechanic_id: "mechanic_1",
            scheduling_id: "scheduling_2",
            description: "change motor, hange oil",
            end_date: "2025-07-09T06:12:30.000Z",
            start_date: "2025-07-09T09:12:12.000Z",
            value: 1000,
            vehicle_id: "vehicle_1",
        })

        const { orderService } = await sut.execute({
            orderServiceId: "order_service_1",
        })

        expect(orderService).toBeDefined()
        expect(orderService).toEqual(
            expect.objectContaining({ id: "order_service_1" }),
        )
    })

})