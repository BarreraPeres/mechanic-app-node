import { beforeEach, describe, expect, it } from "vitest";
import { GetInvoicingValuesUseCases } from "./get-invoicing-values";
import { InMemoryOrderServiceRepository } from "../repositories/in-memory/in-memory-order-service-repository";

let orderServiceRepository: InMemoryOrderServiceRepository
let sut: GetInvoicingValuesUseCases

describe("Get Invoicing Values Use Case", async () => {

    beforeEach(() => {
        orderServiceRepository = new InMemoryOrderServiceRepository
        sut = new GetInvoicingValuesUseCases(orderServiceRepository)
    })

    it("should Be return sum of invoicing in current month", async () => {

        orderServiceRepository.items.push({
            id: "order_service_1",
            mechanic_id: "mechanic_1",
            scheduling_id: "scheduling_1",
            description: "need change oil for car",
            value: 100,
            created_at: new Date("2025-01-09T04:12:12.000Z"),
            end_date: new Date(),
            materials: "any",
            start_date: new Date(),
            status: "PENDING",
            vehicle_id: "vehicle_1",
        })
        orderServiceRepository.items.push({
            id: "order_service_1",
            mechanic_id: "mechanic_1",
            scheduling_id: "scheduling_1",
            description: "need change oil for car",
            value: 100,
            created_at: new Date(),
            end_date: new Date(),
            materials: "any",
            start_date: new Date(),
            status: "PENDING",
            vehicle_id: "vehicle_1",
        })

        const sum = await sut.execute({
            mechanicId: "mechanic_1"
        })

        expect(sum).toEqual(expect.objectContaining({
            sum: 100
        }))

    })


})