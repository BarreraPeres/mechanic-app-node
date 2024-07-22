
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryVehicleRepository } from "../repositories/in-memory/in-memory-vehicle-repository";
import { RegisterVehicleUseCase } from "./register-vehicle.use-case";
import { VehicleAlreadyRegisteredError } from "./errors/vehicle-already-registered-error";

let vehicleRepository: InMemoryVehicleRepository
let sut: RegisterVehicleUseCase

describe("Register Vehicle Use Case", async () => {
    beforeEach(() => {
        vehicleRepository = new InMemoryVehicleRepository()
        sut = new RegisterVehicleUseCase(vehicleRepository)
    })

    it("should be possivel register a new vehicle", async () => {
        const { vehicle } = await sut.execute({
            model: "gol",
            plate: "cis-9999",
            user_id: "user_id",
            year: 1999
        })

        expect(vehicle.id).toBeDefined()
    })

    it("should be possivel register many vehicles a unique user", async () => {

        await sut.execute({
            model: "supra",
            plate: "xis-9999",
            user_id: "user_id",
            year: 1999
        })

        const { vehicle } = await sut.execute({
            model: "gol",
            plate: "cis-9999",
            user_id: "user_id",
            year: 1999
        })

        expect(vehicle.id).toBeDefined()
    })

    it("not be possible to register a vehicle with other user registered in same vehicle", async () => {
        await sut.execute({
            model: "gol",
            plate: "cis-9999",
            user_id: "user_id",
            year: 1999
        })

        await expect(() =>
            sut.execute({
                model: "gol",
                plate: "cis-9999",
                user_id: "user_02",
                year: 1999
            })
        ).rejects.toBeInstanceOf(VehicleAlreadyRegisteredError)

    })
})