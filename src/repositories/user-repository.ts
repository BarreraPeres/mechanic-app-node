import { $Enums, Mechanic, Prisma, User } from "@prisma/client";

export interface findByUserParms {
    CpfOrEmail: {
        cpf: string | Number;
        email?: undefined;
    } | {
        email: string | Number;
        cpf?: undefined;
    }
}

export type UserWithMechanics = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    password_hash: string;
    role: $Enums.Role;
    mechanic_id: string | null;
    mechanic: Mechanic[] | null
}

export interface UserRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByCpfOrEmail(email: string, cpf: string): Promise<User | null>
    findByUser(parms: findByUserParms): Promise<User | null>
    findById(userId: string): Promise<User | null>
    findMechanicsByUserId(userId: string): Promise<UserWithMechanics | null>
}