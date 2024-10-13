import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { InMemoryVehicleRepository } from "../repositories/in-memory/in-memory-vehicle-repository";
import { GetVehiclesUseCase } from "./get-vehicles.use-case";

let userRepository: InMemoryUserRepository
let vehicleRepository: InMemoryVehicleRepository
let sut: GetVehiclesUseCase

describe("Get Vehicles Use Cases", async () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        vehicleRepository = new InMemoryVehicleRepository()
        sut = new GetVehiclesUseCase(userRepository, vehicleRepository)
    })

    it("should be possible to get vehicles of user", async () => {
        await userRepository.create({
            id: "pequeno_rei",
            cpf: "123456",
            email: "samel@gmail.com",
            name: "pequeno rei",
            password_hash: "123456"
        })

        await vehicleRepository.create({
            model: "green",
            plate: "123456",
            user_id: "pequeno_rei",
            year: 1999,
        })


        await vehicleRepository.create({
            model: "yellow_and_black",
            plate: "654321",
            user_id: "pequeno_rei",
            year: 2024,
        })

        const { vehicles } = await sut.execute({
            user_id: "pequeno_rei"
        })

        expect(vehicles).toHaveLength(2)
        expect(vehicles).toEqual([
            expect.objectContaining({ model: "green" }),
            expect.objectContaining({ model: "yellow_and_black" }),
        ])
    })
})