import mongoose from "mongoose";
import { MechanicRepository } from "../repositories/mechanic-repository";
import { IMechanicWorkshop } from "../schemas/MechanicWorkshop";
import { MechanicWorkshopRepository } from "../repositories/mechanic-workshop-repository";
import { IMechanic } from "../schemas/Mechanic";


export interface CreateMechanicWorkshopUseCaseIntegrationPayload {
    external_id: string
    mechanic_external_id: string
    mechanics: IMechanic
    name: string
    phone: string
    latitude: string
    longitude: string
}

export interface CreateMechanicWorkshopUseCaseIntegrationRequest {
    external_id: string
    mechanics: String
    name: string
    phone: string
    latitude: string
    longitude: string
}

export interface CreateMechanicWorkshopUseCaseIntegrationResponse {
    mechanicWorkshop: IMechanicWorkshop
}



export class CreateMechanicWorkshopUseCaseIntegration {
    constructor(
        private mechanicRepository: MechanicRepository,
        private mechanicWorkshopRepository: MechanicWorkshopRepository
    ) { }

    async handle({
        external_id,
        mechanic_external_id,
        latitude,
        longitude,
        name,
        phone }: CreateMechanicWorkshopUseCaseIntegrationPayload): Promise<CreateMechanicWorkshopUseCaseIntegrationResponse | undefined> {

        const mechanics = await this.mechanicRepository.findByExternalId(mechanic_external_id)
        if (!mechanics) {
            return
        }


        const mechanicWorkshop = await this.mechanicWorkshopRepository.create({
            external_id, mechanics: mechanics.mechanics._id, latitude, longitude, name, phone
        })

        return mechanicWorkshop

    }
}