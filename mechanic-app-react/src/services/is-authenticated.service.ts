import { instanceAxios } from "../lib/axios";

export async function isAuthenticatedService(): Promise<boolean> {
    const res = await instanceAxios.get("/verify/refresh")

    const { data } = res

    return data
}