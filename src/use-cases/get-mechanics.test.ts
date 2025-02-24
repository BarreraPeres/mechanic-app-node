import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import bcrjs from "bcryptjs"
import { GetMechanicsUseCase } from "./get-mechanics";
const { hash } = bcrjs

let userRepository: InMemoryUserRepository
let sut: GetMechanicsUseCase

describe("Get Mechanics of User", async () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new GetMechanicsUseCase(userRepository)
    })

    it("should be get mechanic of user", async () => {
        userRepository.create({
            id: "user_id",
            cpf: "123456",
            email: "edwardkenway@gmail.com",
            name: "edward kenway",
            password_hash: await hash("123456", 6),
            mechanic_id: "mechanic_id",
            mechanic: {
                create: {
                    id: "mechanic_id",
                    name: "O gralha",
                    latitude: -23.5505,
                    longitude: -46.6333,
                    phone: "123456789",
                }
            }
        })
        const { user } = await sut.execute({
            userId: "user_id"
        })

        expect(user.mechanic_id).toEqual("mechanic_id")
        expect(user.mechanic).toEqual([expect.objectContaining({
            name: "O gralha"
        })])
        expect(user.name).toEqual("edward kenway")
    })
})
