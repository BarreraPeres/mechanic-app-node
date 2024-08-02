import { Prisma, User } from "@prisma/client";
import { findByUserParms, UserRepository } from "../user-repository";
import { prisma } from "../../config/prisma";

export class PrismaUserRepository implements UserRepository {

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }
    async findByCpfOrEmail(email: string, cpf: string) {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { cpf },
                    { email }
                ]
            }
        })
        return user
    }

    async findByUser({ CpfOrEmail }: findByUserParms) {
        const email = CpfOrEmail.email?.toString()
        const cpf = CpfOrEmail.cpf?.toString()
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        cpf
                    },
                    {
                        email
                    }
                ]
            }
        })

        if (!user) {
            return null
        }

        return user

    }

    async findById(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) {
            return null
        }
        return user
    }

}