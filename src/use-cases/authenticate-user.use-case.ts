import { User } from "@prisma/client"
import { UserRepository } from "../repositories/user-repository"
import { compare } from "bcryptjs"

import { InvalidCredencialsError } from "./errors/invalid-credencials-error"

interface authenticateUserRequest {
    username: string | Number
    password: string
}

interface authenticateUserResponse {
    user: User
}

export class AuthenticateUserUseCase {
    constructor(
        public userRepository: UserRepository
    ) { }
    async execute({
        username,
        password
    }: authenticateUserRequest): Promise<authenticateUserResponse> {

        const cpf = !isNaN(Number(username))
        const CpfOrEmail = cpf ? { cpf: username } : { email: username }


        const user = await this.userRepository.findByUser({ CpfOrEmail })
        if (!user) {
            throw new InvalidCredencialsError()
        }

        const passwordExistent = await compare(password, user.password_hash)
        if (!passwordExistent) {
            throw new InvalidCredencialsError()
        }

        return {
            user
        }
    }
} 