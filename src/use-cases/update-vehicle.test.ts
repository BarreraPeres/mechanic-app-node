
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryVehicleRepository } from "../repositories/in-memory/in-memory-vehicle-repository";
import { UpdateVehiclesUseCase } from "./update-vehicle";

let vehicleRepository: InMemoryVehicleRepository
let sut: UpdateVehiclesUseCase

describe("Register Vehicle Use Case", async () => {
    beforeEach(() => {
        vehicleRepository = new InMemoryVehicleRepository()
        sut = new UpdateVehiclesUseCase(vehicleRepository)
    })

    it("should be possivel to update vehicle", async () => {
        await vehicleRepository.create({
            id: "vehicle_id",
            model: "gol",
            plate: "cis-9999",
            user_id: "user_id",
            brand: "volkswagenn",
            year: 1999
        })

        const { vehicle } = await sut.execute({
            vehicle_id: "vehicle_id",
            brand: "volkswagen",
            model: "gol",
            year: 1998,
            plate: "cis-9999"
        })

        expect(vehicle.year).toEqual(1998)
        expect(vehicle.brand).toEqual("volkswagen")
    })


})