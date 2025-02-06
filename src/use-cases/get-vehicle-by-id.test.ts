import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { InMemoryVehicleRepository } from "../repositories/in-memory/in-memory-vehicle-repository";
import { GetVehicleByIdUseCase } from "./get-vehicle-by-id";

let vehicleRepository: InMemoryVehicleRepository
let sut: GetVehicleByIdUseCase

describe("Get Vehicle Use Cases", async () => {
    beforeEach(() => {
        vehicleRepository = new InMemoryVehicleRepository()
        sut = new GetVehicleByIdUseCase(vehicleRepository)
    })

    it("should be possible to get vehicle of user", async () => {
        await vehicleRepository.create({
            id: "1",
            model: "green",
            plate: "123456",
            user_id: "pequeno_rei",
            year: 1999,
            brand: "ford"
        })


        const { vehicle } = await sut.execute({
            id: "1"
        })

        expect(vehicle.id).toEqual(expect.any(String))
        expect(vehicle).toEqual(
            expect.objectContaining({ brand: "ford" }),
        )
    })
})