import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryVehicleRepository } from "../repositories/in-memory/in-memory-vehicle-repository";
import { FetchVehicleOrderServicesHistoryUseCase } from "./fetch-vehicle-order-services.use-case";
import { InMemoryOrderServiceRepository } from "../repositories/in-memory/in-memory-order-service-repository";

let orderServiceRepository: InMemoryOrderServiceRepository
let sut: FetchVehicleOrderServicesHistoryUseCase
describe("Fetch Vehicle Order Services Use Cases", async () => {
    beforeEach(() => {
        orderServiceRepository = new InMemoryOrderServiceRepository()
        sut = new FetchVehicleOrderServicesHistoryUseCase(orderServiceRepository)
    })

    it("should be possible to fetch order services for a vehicle", async () => {
        orderServiceRepository.create({
            vehicle_id: "vehicle_id",
            scheduling_id: "id_2",
            mechanic_id: "id_1",
            description: "Oil change",
            end_date: "2024-07-09T04:12:12.000Z",
            status: "SCHEDULED",
            start_date: "2024-07-05T04:12:12.000Z",
            value: 100
        })

        const { orderServices } = await sut.execute({
            vehicleId: "vehicle_id",
            page: 0
        })

        expect(orderServices).toHaveLength(1)
    })

    it("should be possible to fetch order services pagineted", async () => {
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
            vehicleId: "vehicle_id",
            page: 1
        })

        expect(orderServices).toHaveLength(2)
        expect(orderServices).toEqual([
            expect.objectContaining({ mechanic_id: "mechanic 11" }),
            expect.objectContaining({ mechanic_id: "mechanic 12" })
        ])
    })
})