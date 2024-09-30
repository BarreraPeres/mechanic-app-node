import { MechanicRepository } from "../repositories/mechanic-repository";
import { UserRepository } from "../repositories/user-repository";

export interface GetUserFromTokenUseCaseRequest {
    token_id: string
    role: string
    socket_id: string
}

export class GetUserFromTokenUseCase {
    constructor(
        private userRepository: UserRepository,
        private mechanicRepository: MechanicRepository
    ) { }

    async handle({ token_id, role, socket_id }: GetUserFromTokenUseCaseRequest): Promise<any> {


        if (role === "CLIENT") {
            const user = await this.userRepository.findByTokenIdAndSave(token_id, socket_id)

            return user

        } else {
            const user = await this.mechanicRepository.findByTokenIdAndSave(token_id, socket_id)
            return user
        }



    }
}