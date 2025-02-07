import { instanceAxios } from "../../lib/axios";

interface GetVehiclesServiceResponse {
    vehicles: {
        id: string,
        model: string,
        plate: string,
        user_id: string,
        brand: string,
        year: string
    }[]
}


export async function GetVehiclesService(): Promise<GetVehiclesServiceResponse> {
    const res = await instanceAxios.get("/vehicles")
    const { data } = res
    console.log(data.vehicles)
    return data.vehicles

} 