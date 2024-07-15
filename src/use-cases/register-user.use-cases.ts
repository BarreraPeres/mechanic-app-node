import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserRepository } from "../repositories/user-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterUserRequest {
    name: string
    email: string
    cpf: string
    password: string
}

interface RegisterUserResponse {
    user: User
}

export class RegisterUserUseCases {
    constructor(
        public userRepository: UserRepository
    ) { }

    async execute({
        name,
        cpf,
        email,
        password
    }: RegisterUserRequest): Promise<RegisterUserResponse> {

        const password_hash = await hash(password, 6)

        const emailOrCpfExisting = await this.userRepository.findByCpfOrEmail(email, cpf)
        if (emailOrCpfExisting) {
            throw new UserAlreadyExistsError()
        }


        const user = await this.userRepository.create({
            cpf,
            email,
            name,
            password_hash,
        })

        return { user }


    }
}
