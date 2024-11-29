import axios, { AxiosError } from "axios";
import { refreshTokenService } from "../services/refresh-token.service";

export const instanceAxios = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export function setupAxiosInterceptors() {
    instanceAxios.interceptors.request.use(
        async (config) => {
            const accessToken = localStorage.getItem("accessToken")
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`
            }
            return config
        },
        (error) => {
            console.error(error)
        }
    )




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
                    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
                    return instanceAxios(originalConfig)
                }

                return Promise.reject(e)
            }
        }
    )
}