import { instanceAxios } from "../../lib/axios";

interface UpdateVehicleServiceResponse {
    vehicle: {
        model: string,
        plate: string,
        // user_id: string,
        brand: string,
        year: string
    }
}

interface UpdateVehicleService {
    id: string,
    model: string,
    plate: string,
    brand: string,
    year: number
}


export async function UpdateVehicleService(
    { id, brand, model, plate, year }: UpdateVehicleService
): Promise<UpdateVehicleServiceResponse> {
    const res = await instanceAxios.put(`/vehicle/${id}/update`, {
        model: model,
        plate: plate,
        brand: brand,
        year: year
    }, { withCredentials: true })
    const { data } = res
    return data.vehicle

} 