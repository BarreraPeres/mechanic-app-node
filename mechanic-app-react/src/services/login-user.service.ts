import { instanceAxios } from "../lib/axios"

type LoginUserBody = {
    username: string,
    password: string
}

export type LoginUserRes = {
    accessToken: string
    status: number
}

export async function LoginUserService({
    password,
    username }: LoginUserBody): Promise<LoginUserRes> {
    const res = await instanceAxios.post("/login", {
        password,
        username,
    }, {
        withCredentials: true
    })

    const { data, status } = res

    const accessToken = data

    return { accessToken, status }
}