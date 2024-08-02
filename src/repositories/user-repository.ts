import { Prisma, User } from "@prisma/client";

export interface findByUserParms {
    CpfOrEmail: {
        cpf: string | Number;
        email?: undefined;
    } | {
        email: string | Number;
        cpf?: undefined;
    }
}

export interface UserRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByCpfOrEmail(email: string, cpf: string): Promise<User | null>
    findByUser(parms: findByUserParms): Promise<User | null>
    findById(userId: string): Promise<User | null>
}