import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { GetUserProfileUseCase } from "./get-user-profile.use-case";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import bcrjs from "bcryptjs"
const { hash } = bcrjs


let userRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

describe("Get User Profile", async () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new GetUserProfileUseCase(userRepository)
    })

    it("should be get profile user", async () => {
        userRepository.create({
            id: "user_id",
            cpf: "123456",
            email: "edwardkenway@gmail.com",
            name: "edward kenway",
            password_hash: await hash("123456", 6)
        })

        const { user } = await sut.execute({
            userId: "user_id"
        })

        expect(user.name).toEqual("edward kenway")
    })


    it("should not be possible to get profile with id inexistent", async () => {
        await expect(() => sut.execute({
            userId: "user_inexistent"
        })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})
