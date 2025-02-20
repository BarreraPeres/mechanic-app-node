import { LoginUserRes } from "./login-user.service";
import { instanceAxios } from "../../lib/axios";

export async function refreshTokenService(): Promise<LoginUserRes> {
    const res = await instanceAxios.patch("/token/refresh", {
        withCredentials: true
    })
    const { data } = res
    return data
}