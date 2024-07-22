import { beforeEach, describe, expect, it } from "vitest";
import { CreateMechanicUseCase } from "./create-mechanic.use-case";
import { InMemoryMechanicRepository } from "../repositories/in-memory/in-memory-mechanic-repository";


let mechanicRepository: InMemoryMechanicRepository
let sut: CreateMechanicUseCase

describe("Create Mechanic Use Case", async => {

    beforeEach(() => {
        mechanicRepository = new InMemoryMechanicRepository()
        sut = new CreateMechanicUseCase(mechanicRepository)
    })

    it("should be possible to register a new mechanic", async () => {
        const { mechanic } = await sut.execute({
            latitude: 0,
            longitude: 0,
            name: "Mechanic Javascript",
            phone: "phone"
        })

        expect(mechanic.id).toBeDefined()
        expect(mechanic.id).toEqual(expect.any(String))
    })
})