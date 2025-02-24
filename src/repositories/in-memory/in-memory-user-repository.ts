import { Mechanic, Prisma, User } from "@prisma/client";
import { findByUserParms, UserRepository } from "../user-repository";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepository {
    public mechanic: Mechanic[] = []
    public items: User[] = []

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: data.id ?? randomUUID(),
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            password_hash: data.password_hash,
            role: data.role ?? "CLIENT",
            mechanic_id: data.mechanic_id ?? null,
            mechanic: data.mechanic,
        }

        this.items.push(user)
        if (user.mechanic?.create) {
            this.mechanic.push(user.mechanic.create as any)
        }
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

    async findMechanicsByUserId(userId: string) {
        const user = this.items
            .find(item => item.id === userId)

        if (!user) return null

        const mechanic = this.mechanic.filter(item => item.id === user.mechanic_id)

        if (!mechanic) return null

        const userWithMechanic = {
            ...user,
            mechanic: mechanic
        }

        return userWithMechanic

    }



}
