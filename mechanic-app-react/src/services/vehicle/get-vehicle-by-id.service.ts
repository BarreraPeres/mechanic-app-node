import { instanceAxios } from "../../lib/axios";

interface GetVehicleByIdServiceResponse {
    vehicle: {
        id: string,
        model: string,
        plate: string,
        user_id: string,
        brand: string,
        year: string
    }
}

interface GetVehicleByIdServiceRequest {
    id: string | undefined
}


export async function GetVehicleByIdService({ id }: GetVehicleByIdServiceRequest): Promise<GetVehicleByIdServiceResponse> {
    const res = await instanceAxios.get(`/vehicle/${id}`)

    const { data } = res
    console.log(data.vehicle)
    return data.vehicle

} 