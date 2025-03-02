import { instanceAxios } from "../../lib/axios";

interface getMechanicsServiceRes {
    userWithMechanics: {
        id: string
        name: string
        email: string
        cpf: string
        role: string
        password_hash: string
        created_at: string
        updated_at: string
        mechanic_id: string
        mechanic: {
            id: string
            name: string
            phone: number
            latitude: number
            longitude: number
        }[]
    }
}

export async function GetMechanicsService(): Promise<getMechanicsServiceRes> {
    try {
        const res = await instanceAxios.get("/mechanics", {
        })

        const { data } = res

        return data
    } catch (err) {
        window.error(err)
        throw err
    }
} 