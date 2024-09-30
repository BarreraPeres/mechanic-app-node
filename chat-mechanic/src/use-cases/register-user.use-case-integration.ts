import { UserRepository } from "../repositories/user-repository"

export interface RegisterUserUseCaseIntegrationRequest {
    external_id: string,
    email: string,
    name: string,
    role: string,
}

type User = {
    _id: String
    external_id: string
    name: string
    role: string
    email: string
    socket_id?: string
    avatar?: string
} | null

export interface RegisterUserUseCaseIntegrationResponse {
    user: User
}

export class RegisterUserUseCaseIntegration {
    constructor(
        private userRepository: UserRepository
    ) { }

    async handle({
        email,
        external_id,
        name,
        role
    }: RegisterUserUseCaseIntegrationRequest): Promise<RegisterUserUseCaseIntegrationResponse> {

        const user = this.userRepository.create({ email, external_id, name, role })



        return user

    }
}