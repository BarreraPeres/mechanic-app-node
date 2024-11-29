import { LoginUserRes } from "./login-user.service";
import { instanceAxios } from "../lib/axios";

export async function refreshTokenService(): Promise<LoginUserRes> {
    const res = await instanceAxios.patch("/token/refresh", {
        withCredentials: false
    })
    const { data } = res
    return data
}