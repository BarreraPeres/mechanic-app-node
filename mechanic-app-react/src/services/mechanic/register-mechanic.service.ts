import { instanceAxios } from "../../lib/axios"

type RegisterMechanicBody = {
    name: string,
    phone: string
    latitude: number
    longitude: number
}

type RegisterMechanicRes = {
    mechanic: {
        id: string
        name: string
        phone: string
        latitude: string
        longitude: string
    }
}


export async function RegisterMechanicService({
    latitude, longitude, name, phone }: RegisterMechanicBody): Promise<RegisterMechanicRes | null> {
    try {
        const res = await instanceAxios.post("/mechanic", {
            latitude, longitude, name, phone
        }, {
            withCredentials: true
        })

        return res.data

    } catch (error) {
        window.error(error)
        return null
    }
}