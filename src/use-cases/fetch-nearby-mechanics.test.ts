import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryMechanicRepository } from "../repositories/in-memory/in-memory-mechanic-repository";
import { FetchNearbyMechanicsUseCase } from "./fetch-nearby-mechanics.use-case";

let mechanicRepository: InMemoryMechanicRepository
let sut: FetchNearbyMechanicsUseCase

describe("Fetch Nearby Mechanics Use Case", async () => {

    beforeEach(() => {
        mechanicRepository = new InMemoryMechanicRepository
        sut = new FetchNearbyMechanicsUseCase(mechanicRepository)
    })

    it("should Be fetch mechanics nearby", async () => {

        mechanicRepository.create({
            name: "mechanic nearby",
            latitude: -23.297719,
            longitude: -45.943171,

        })

        mechanicRepository.create({
            name: "mechanic far",
            latitude: -23.2016939,
            longitude: -45.8927044,
        })

        const { mechanics } = await sut.execute({
            userLatitude: -23.297719,
            userLongitude: -45.943171
        })

        expect(mechanics).toHaveLength(1)
        expect(mechanics).toEqual([
            expect.objectContaining({
                name: "mechanic nearby"
            })
        ])
    })


})