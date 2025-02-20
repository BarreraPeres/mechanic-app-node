import { instanceAxios } from "../../lib/axios";
import { searchMechanicsServiceRequest } from "./search-mechanics.service";

interface GetMechanicsNearbyServiceRequest {
    latitude: number,
    longitude: number
}


export async function GetMechanicsNearbyService({ latitude, longitude }: GetMechanicsNearbyServiceRequest): Promise<searchMechanicsServiceRequest> {
    const res = await instanceAxios.get("/mechanics/nearby", {
        params: {
            latitude,
            longitude
        }
    })

    const { data } = res

    return data

} 