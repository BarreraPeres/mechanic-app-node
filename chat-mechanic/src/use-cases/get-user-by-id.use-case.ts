import { MechanicRepository } from "../repositories/mechanic-repository";
import { UserRepository } from "../repositories/user-repository";
import { RegisterUserUseCaseIntegrationResponse } from "./register-user.use-case-integration";

export interface GetUserByIdUseCaseRequest {
    _id: String
    role: string
}


export class GetUserByIdUseCase {
    constructor(
        private userRepository: UserRepository,
        private mechanicRepository: MechanicRepository
    ) { }

    async handle({ _id, role }: GetUserByIdUseCaseRequest): Promise<any> {

        if (role === "CLIENT") {
            const user = await this.userRepository.findById(_id)

            // if (!user) {
            //     return null
            // }

            return { user }
        } else {
            const user = await this.mechanicRepository.findById(_id)

            return { user }

        }
    }


}