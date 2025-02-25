import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrderServiceRepository } from "../repositories/in-memory/in-memory-order-service-repository";
import { FetchOrderServiceUseCases } from "./fetch-order-services";
import { OrderServiceRepository } from "../repositories/order-service-repository";
import { InMemoryScheduleRepository } from "../repositories/in-memory/in-memory-scheduling-repository";
import { SchedulingRepository } from "../repositories/scheduling-repository";

let orderServiceRepository: OrderServiceRepository
let schedulingRepository: SchedulingRepository
let sut: FetchOrderServiceUseCases

describe("Fetch Order-Service Use Case", async () => {
    beforeEach(() => {
        orderServiceRepository = new InMemoryOrderServiceRepository()
        schedulingRepository = new InMemoryScheduleRepository()
        sut = new FetchOrderServiceUseCases(orderServiceRepository)
    })

    it("should be the fetch history", async () => {

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

        const { orderServices } = await sut.execute({
            mechanicId: "mechanic_1",
            page: 0
        })

        expect(orderServices).toHaveLength(2)
        expect(orderServices).toEqual([
            expect.objectContaining({ id: "order_service_1" }),
            expect.objectContaining({ id: "order_service_2" })
        ])
    })
    it("should be the fetch history with status SCHEDULED", async () => {

        await orderServiceRepository.create({
            id: "order_service_1",
            status: "SCHEDULED",
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
            status: "PENDING",
            mechanic_id: "mechanic_1",
            scheduling_id: "scheduling_2",
            description: "change motor, hange oil",
            end_date: "2025-07-09T06:12:30.000Z",
            start_date: "2025-07-09T09:12:12.000Z",
            value: 1000,
            vehicle_id: "vehicle_1",
        })

        const { orderServices } = await sut.execute({
            mechanicId: "mechanic_1",
            status: "SCHEDULED",
            page: 0
        })

        expect(orderServices).toHaveLength(1)
        expect(orderServices).toEqual([
            expect.objectContaining({ id: "order_service_1" }),
        ])
    })

    it("should be possible to fetch order services pagineted with 10 pages", async () => {
        for (let i = 1; i <= 12; i++) {
            await orderServiceRepository.create({
                vehicle_id: "vehicle_id",
                scheduling_id: "id_2",
                mechanic_id: `mechanic ${i}`,
                description: "Oil change",
                end_date: "2024-07-09T04:12:12.000Z",
                status: "SCHEDULED",
                start_date: "2024-07-05T04:12:12.000Z",
                value: 100
            })
        }

        const { orderServices } = await sut.execute({
            mechanicId: "mechanic 1",
            status: "SCHEDULED",
            page: 1
        })

        expect(orderServices).toHaveLength(2)
        expect(orderServices).toEqual([
            expect.objectContaining({ mechanic_id: "mechanic 11" }),
            expect.objectContaining({ mechanic_id: "mechanic 12" })
        ])
    })
    it("should be possible to fetch order services with vehicles", async () => {

        await orderServiceRepository.create({
            vehicle_id: "vehicle_id",
            scheduling_id: "id_2",
            mechanic_id: `mechanic_id`,
            description: "Oil change",
            end_date: "2024-07-09T04:12:12.000Z",
            status: "SCHEDULED",
            start_date: "2024-07-05T04:12:12.000Z",
            value: 100,
            vehicle: {
                id: "vehicle_id",
                user_id: "user_id",
                plate: "1234-csas",
                model: "gol caixa",
                brand: "brand",
                year: 2020
            }
        })

        const { orderServices } = await sut.execute({
            mechanicId: "mechanic 1",
            status: "SCHEDULED",
            page: 0
        })

        expect(orderServices).toHaveLength(1)
        expect(orderServices[0].vehicle).toEqual(
            expect.objectContaining({ model: "gol caixa" }),
        )
    })

})