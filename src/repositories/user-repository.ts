import { Prisma, User } from "@prisma/client";

export interface UserRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByCpfOrEmail(email: string, cpf: string): Promise<User | null>
}