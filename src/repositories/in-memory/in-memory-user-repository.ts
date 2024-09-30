import { Prisma, User } from "@prisma/client";
import { findByUserParms, UserRepository } from "../user-repository";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepository {

    public items: User[] = []

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: data.id ?? randomUUID(),
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            password_hash: data.password_hash,
            role: data.role ?? "CLIENT",
            mechanic_id: data.mechanic_id ?? null
            // mechanic?.connect?.id ?? null
        }
        this.items.push(user)

        return user
    }


    async findByCpfOrEmail(email: string, cpf: string) {
        const user = this.items.find(item => item.cpf === cpf || item.email === email) || null
        return user
    }

    async findByUser(parms: findByUserParms) {
        const user = this.items.find(item =>
            item.cpf === parms.CpfOrEmail.cpf || item.email === parms.CpfOrEmail.email)
            || null
        return user
    }

    async findById(userId: string) {
        const user = this.items.find(item => item.id === userId) || null

        return user
    }



}
