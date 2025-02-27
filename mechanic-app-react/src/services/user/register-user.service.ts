import { instanceAxios } from "../../lib/axios.js"

type RegisterUserBody = {
    email: string,
    password: string,
    cpf: string,
    name: string
    role: "CLIENT" | "EMPLOYEE" | "BOSS"
}

export type RegisterUserRes = {
    accessToken: string
    status: number
}

export async function RegisterUserService({
    password,
    cpf,
    email,
    role,
    name
}: RegisterUserBody): Promise<RegisterUserRes> {
    const res = await instanceAxios.post("/register", {
        password,
        cpf,
        email,
        name,
        role
    }, {
        withCredentials: true
    })

    const { data, status } = res

    const accessToken = data

    return { accessToken, status }
}