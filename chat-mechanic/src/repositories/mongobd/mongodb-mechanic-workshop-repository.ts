import { MechanicWorkshop } from "../../schemas/MechanicWorkshop";
import { CreateMechanicWorkshopUseCaseIntegrationRequest, CreateMechanicWorkshopUseCaseIntegrationResponse } from "../../use-cases/create-mechanic-workshop.use-case";
import { MechanicWorkshopRepository } from "../mechanic-workshop-repository";

export class MongodbMechanicWorkshopRepository implements MechanicWorkshopRepository {

    async create({ external_id, mechanics, latitude, longitude, name, phone }: CreateMechanicWorkshopUseCaseIntegrationRequest) {
        const mechanicWorkshop = await MechanicWorkshop.create({
            external_id,
            name,
            phone,
            latitude,
            longitude,
            mechanics
        })

        return { mechanicWorkshop }
    }

    async findByExtenalId(external_id: string) {
        const mechanicWorkshop = await MechanicWorkshop.findOne({
            external_id
        })
        if (!mechanicWorkshop) {
            return null
        }
        return { mechanicWorkshop }
    }
}