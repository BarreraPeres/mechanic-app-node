import { instanceAxios } from "../../lib/axios";

interface GetTimesByMechanicIdServiceRequest {
    mechanicId: string
}

interface GetTimesByMechanicIdServiceResponse {
    avaliebleTimes: string[]
}


export async function GetTimesByMechanicIdService({
    mechanicId
}: GetTimesByMechanicIdServiceRequest): Promise<GetTimesByMechanicIdServiceResponse> {
    const res = await instanceAxios.get(`/times/${mechanicId}`)
    const { data } = res
    return data
} 