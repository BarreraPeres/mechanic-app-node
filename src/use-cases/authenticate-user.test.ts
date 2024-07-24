import { describe, beforeEach, it, expect, beforeAll } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { AuthenticateUserUseCase } from "./authenticate-user.use-case";
import { hash } from "bcryptjs";
import { InvalidCredencialsError } from "./errors/invalid-credencials-error";

let userRepository: InMemoryUserRepository
let sut: AuthenticateUserUseCase
describe("Authenticate User Use Case", async () => {
    beforeEach(async () => {
        userRepository = new InMemoryUserRepository()
        sut = new AuthenticateUserUseCase(userRepository)

        userRepository.create({
            cpf: "123456",
            email: "edwardkenway@gmail.com",
            name: "edward kenway",
            password_hash: await hash("123456", 6)
        })
    })

    it("should be for the user to authenticate with email", async () => {
        const { user } = await sut.execute({
            password: "123456",
            username: "edwardkenway@gmail.com"
        })

        expect(user.id).toBeDefined
    })

    it("should be possible to regiter with password", async () => {
        await sut.execute({
            password: "123456",
            username: "123456"
        })
    })

    it("should not be possible to register with wrong email", async () => {
        await expect(() => sut.execute({
            password: "123456",
            username: "invalid@gmail.com"
        })
        ).rejects.toBeInstanceOf(InvalidCredencialsError)
    })

    it("should not be possible to register with inexitent cpf", async () => {
        await expect(() => sut.execute({
            password: "123456",
            username: "123123"
        })
        ).rejects.toBeInstanceOf(InvalidCredencialsError)
    })

    it("should not be possible to register with wrong password", async () => {
        await expect(() => sut.execute({
            password: "123123",
            username: "edwardkenway@gmail.com"
        })).rejects.toBeInstanceOf(InvalidCredencialsError)
    })

})