import { beforeEach, describe, expect, it } from "vitest";
import { CreateMechanicUseCase } from "./create-mechanic.use-case";
import { InMemoryMechanicRepository } from "../repositories/in-memory/in-memory-mechanic-repository";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";


let mechanicRepository: InMemoryMechanicRepository
let userRepository = new InMemoryUserRepository
let sut: CreateMechanicUseCase

describe("Create Mechanic Use Case", async => {

    beforeEach(() => {
        mechanicRepository = new InMemoryMechanicRepository()
        userRepository = new InMemoryUserRepository()
        sut = new CreateMechanicUseCase(mechanicRepository, userRepository)
    })

    it("should be possible to register a new mechanic", async () => {
        await userRepository.create({
            id: "pequeno_rei",
            cpf: "123456",
            email: "samel@gmail.com",
            name: "pequeno rei",
            password_hash: "123456"
        })

        const { mechanic } = await sut.execute({
            latitude: 0,
            longitude: 0,
            id_user: "pequeno_rei",
            name: "Mechanic Javascript",
            phone: "phone"
        })

        expect(mechanic.id).toBeDefined()
        expect(mechanic.id).toEqual(expect.any(String))
    })

    it("should be possible a user to have 2 mechanics", async () => {
        await userRepository.create({
            id: "pequeno_rei",
            cpf: "123456",
            email: "samel@gmail.com",
            name: "pequeno rei",
            password_hash: "123456"
        })

        const { mechanic: mechanic1 } = await sut.execute({
            latitude: 0,
            longitude: 0,
            id_user: "pequeno_rei",
            name: "Mechanic Javascript",
            phone: "phone"
        })
        const { mechanic: mechanic2 } = await sut.execute({
            latitude: 0,
            longitude: 0,
            id_user: "pequeno_rei",
            name: "Mechanic Javascript",
            phone: "phone"
        })

        expect(mechanic1.id).toBeDefined()
        expect(mechanic1.id).toEqual(expect.any(String))

        expect(mechanic2.id).toBeDefined()
        expect(mechanic2.id).toEqual(expect.any(String))

    })
})