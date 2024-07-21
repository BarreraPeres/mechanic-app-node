import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryMechanicRepository } from "../repositories/in-memory/in-memory-mechanic-repository";
import { SearchMechanicUseCase } from "./search-mechanics.use-case";

let mechanicRepository: InMemoryMechanicRepository
let sut: SearchMechanicUseCase
describe("Search Mechanics Use Cases", async () => {
    beforeEach(() => {
        mechanicRepository = new InMemoryMechanicRepository()
        sut = new SearchMechanicUseCase(mechanicRepository)
    })

    it("should be possible to search mechanics", async () => {

        await mechanicRepository.create({
            name: "mechanic 1",
            latitude: 0,
            longitude: 0,
        })


        const { mechanics } = await sut.execute({
            query: "mechanic",
            page: 0
        })

        expect(mechanics).toHaveLength(1)
    })

    it("should be possible to search with pagineted the mechanics ", async () => {

        for (let i = 1; i <= 22; i++) {
            await mechanicRepository.create({
                name: `mechanic ${i}`,
                latitude: 0,
                longitude: 0,
            })
        }

        const { mechanics } = await sut.execute({
            query: "mechanic",
            page: 2
        })
        expect(mechanics).toHaveLength(2)
        expect(mechanics).toEqual([
            expect.objectContaining({ name: "mechanic 21" }),
            expect.objectContaining({ name: "mechanic 22" })
        ])


    })
})