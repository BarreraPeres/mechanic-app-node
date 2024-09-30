import { User } from "../../schemas/User";
import { RegisterUserUseCaseIntegrationRequest, RegisterUserUseCaseIntegrationResponse } from "../../use-cases/register-user.use-case-integration";
import { UserRepository } from "../user-repository";

export class MongodbUserRepository implements UserRepository {

    async create({ email, external_id, name, role }: RegisterUserUseCaseIntegrationRequest) {
        const user = await User.create({
            email,
            external_id,
            role,
            name
        })

        return { user }
    }

    async findByTokenIdAndSave(token_id: string, socket_id: string) {
        const userById = await User.findOne({
            external_id: token_id
        })


        if (!userById) {
            return null
        }

        const user = await User.findByIdAndUpdate({ _id: userById._id }, { socket_id })

        return { user }
    }

    async findByExternalId(external_id: string) {
        const user = await User.findOne({
            external_id
        })

        if (!user) {
            return null
        }


        return { user }
    }

    async findById(_id: String) {
        const user = await User.findOne({
            _id
        })

        if (!user) {
            return null
        }


        return { user }
    }

}

