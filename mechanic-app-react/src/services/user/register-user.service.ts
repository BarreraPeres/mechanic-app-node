import { instanceAxios } from "../../lib/axios.js"

type RegisterUserBody = {
    email: string,
    password: string,
    cpf: string,
    name: string
}

export type RegisterUserRes = {
    accessToken: string
    status: number
}

export async function RegisterUserService({
    password,
    cpf,
    email,
    name }: RegisterUserBody): Promise<RegisterUserRes> {
    const res = await instanceAxios.post("/register", {
        password,
        cpf,
        email,
        name
    }, {
        withCredentials: true
    })

    const { data, status } = res

    const accessToken = data

    return { accessToken, status }
}