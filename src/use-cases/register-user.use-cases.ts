import { $Enums, User } from "@prisma/client"
import { UserRepository } from "../repositories/user-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import bcrjs from "bcryptjs"
const { hash } = bcrjs
interface RegisterUserRequest {
    name: string
    email: string
    cpf: string
    password: string
    role: $Enums.Role
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
        password,
        role
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
            role
        })

        return { user }


    }
}
