import { instanceAxios } from "../lib/axios";

export async function makeLogout(): Promise<boolean> {
    const res = await instanceAxios.get("/logout")

    const { data } = res

    return data
}