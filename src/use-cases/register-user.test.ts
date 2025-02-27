import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUserUseCases } from "./register-user.use-cases";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import pgk from "bcryptjs"
const { compare } = pgk

let userRepository: InMemoryUserRepository
let sut: RegisterUserUseCases

describe("Register User Use Cases", async () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new RegisterUserUseCases(userRepository)
    })

    it("should be possible to register a user", async () => {
        const { user } = await sut.execute({
            cpf: "123456",
            email: "josephBell@email.com",
            name: "joseph",
            password: "123456",
            role: "CLIENT"
        })

        expect(user.id).toBeDefined()
        expect(user.id).toEqual(expect.any(String))
        expect(user.role).toEqual("CLIENT")
    })


    it("should be not possible to register a user with email registered", async () => {

        const { user } = await sut.execute({
            cpf: "123456",
            email: "josephBell@email.com",
            name: "joseph",
            password: "123456",
            role: "CLIENT"
        })

        await expect(() => sut.execute({
            cpf: "123456",
            email: "josephBell@email.com",
            name: "joseph",
            password: "123456",
            role: "CLIENT"
        })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

    it("should be not possible to register a user with cpf registered", async () => {

        const { user } = await sut.execute({
            cpf: "123456",
            email: "josephBell@email.com",
            name: "joseph",
            password: "123456",
            role: "CLIENT"
        })

        await expect(() => sut.execute({
            cpf: "123456",
            email: "josephBell1@email.com",
            name: "joseph",
            password: "123456",
            role: "CLIENT"
        })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })


    it("should user hash passord after being registered", async () => {

        const { user } = await sut.execute({
            cpf: "123456",
            email: "josephBell@email.com",
            name: "joseph",
            password: "123456",
            role: "CLIENT"
        })

        const isPasswordHashed = await compare("123456", user.password_hash)

        expect(isPasswordHashed).toBeTruthy
        expect(isPasswordHashed).toBe(true)
    })

})