import { Mechanic } from "../../schemas/Mechanic";
import { RegisterMechanicUseCaseIntegrationRequest } from "../../use-cases/register-mechanic.use-case";
import { MechanicRepository } from "../mechanic-repository";

export class MongodbMechanicRepository implements MechanicRepository {


    async create({ email, external_id, name, role, }: RegisterMechanicUseCaseIntegrationRequest) {
        const mechanic = await Mechanic.create({
            email, external_id, name, role
        })

        return { mechanic }
    }

    async findByEmail(email: string) {
        const mechanic = await Mechanic.findOne({
            email
        })
        if (!mechanic) {
            return null
        }

        return { mechanic }
    }

    async findByExternalId(mechanic_external_id: string) {
        const mechanics = await Mechanic.findOne({
            external_id: mechanic_external_id
        })

        if (!mechanics) {
            return null
        }

        return { mechanics }
    }

    async findByTokenIdAndSave(token_id: string, socket_id: string) {
        const userById = await Mechanic.findOne({
            external_id: token_id
        })

        if (!userById) {
            return null
        }
        const user = await Mechanic.findOneAndUpdate({ _id: userById._id }, { socket_id })

        return { user }
    }

    async findById(_id: String) {
        const user = await Mechanic.findOne({
            _id
        })

        if (!user) {
            return null
        }

        return { user }
    }

}