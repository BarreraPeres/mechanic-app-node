import axios, { AxiosError } from "axios";
import { refreshTokenService } from "../services/user/refresh-token.service";

export const instanceAxios = axios.create({
    baseURL: "http://localhost:3333",
    withCredentials: true,
})

export function setupAxiosInterceptors() {
    instanceAxios.interceptors.request.use(
    ) // this way works, dont overwrite refresh token

    instanceAxios.interceptors.response.use(
        async (response) => {
            return response
        },
        async (e: AxiosError) => {
            if (e.response?.status === 401 && e.config) {
                const originalConfig = e.config
                const { accessToken } = await refreshTokenService()
                console.log("refreshToken")
                if (accessToken) {
                    localStorage.setItem("accessToken", accessToken)
                    instanceAxios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
                    return instanceAxios(originalConfig)
                }

                return Promise.reject(e)
            }

            if (e.response?.status === 419 && e.config) {
                const originalConfig = e.config
                window.Error("session expired")
                window.location.href = "/login"

                return instanceAxios(originalConfig)

            }
        }
    )
}