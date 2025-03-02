import { instanceAxios } from "../../lib/axios"


interface FetchOrderServiceBody {
    mechanicId: string
    status?: "PENDING" | "SCHEDULED" | "FINISHED"
    page?: number
}
export interface FetchOrderServiceRes {
    orderServices: {
        id: string;
        created_at: Date;
        status: string;
        description: string | null;
        materials: string | null;
        value: number;
        start_date: Date;
        end_date: Date;
        scheduling_id: string | null;
        mechanic_id: string | null;
        vehicle_id: string;
        vehicle: {
            id: string;
            model: string;
            brand: string;
            year: number;
            plate: string;
        }
    }[]
}

export async function FetchOrderService({
    mechanicId,
    page,
    status
}: FetchOrderServiceBody): Promise<FetchOrderServiceRes> {

    const res = await instanceAxios.get(`/order-services/${mechanicId}?status=${status}&page=${page}`)

    return res.data.orderServices
}   
