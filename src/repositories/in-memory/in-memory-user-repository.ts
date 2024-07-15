import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { randomUUID } from "crypto";

export class InMemoryUserRepositort implements UserRepository {
    public items: User[] = []

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: data.id ?? randomUUID(),
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            password_hash: data.password_hash,
            role: data.role ?? "CLIENT"
        }
        this.items.push(user)

        return user
    }


    async findByCpfOrEmail(email: string, cpf: string) {
        const user = this.items.find(item => item.cpf === cpf || item.email === email) || null
        return user
    }
}
