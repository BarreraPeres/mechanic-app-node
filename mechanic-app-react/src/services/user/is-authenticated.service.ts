import { instanceAxios } from "../../lib/axios";
export interface isAuthenticatedResponse {
    isAuthenticated: boolean
    role: "CLIENT" | "BOSS" | "EMPLOYEE"
}
export async function isAuthenticatedService(): Promise<isAuthenticatedResponse> {
    const res = await instanceAxios.get("/verify/refresh")

    const { data } = res

    return data
}