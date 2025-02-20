import { instanceAxios } from "../../lib/axios"

export interface Mechanic {

    phone: string
    id: string
    latitude: number
    longitude: number
    name: string
}
export type searchMechanicsServiceRequest = {
    mechanics: {

        id: string
        latitude: number
        longitude: number
        name: string
        phone: string
    }[]
}

export async function searchMechanicsService(): Promise<searchMechanicsServiceRequest> {
    const res = await instanceAxios.get("/mechanics/search")
    const { data } = res
    return data
}