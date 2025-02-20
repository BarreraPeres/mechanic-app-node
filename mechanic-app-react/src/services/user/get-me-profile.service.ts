import { instanceAxios } from "../../lib/axios"

export interface getMeProfileServiceReponse {
    user: {
        role: string
        name: string
        email: string
        cpf: string
    }
}

export async function getMeProfileService(): Promise<getMeProfileServiceReponse> {
    const res = await instanceAxios.get("/me")

    console.log(res.data)

    return res.data
}