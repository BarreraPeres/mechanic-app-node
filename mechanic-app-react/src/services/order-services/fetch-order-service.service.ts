import { instanceAxios } from "../../lib/axios"


interface FetchOrderServiceBody {
    mechanicId: string
    status?: string
    page?: number
}

export type OrderService = {
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
}

export interface FetchOrderServiceRes {
    orderServices: OrderService[]
}

export async function FetchOrderService({
    mechanicId,
    page,
    status
}: FetchOrderServiceBody): Promise<FetchOrderServiceRes> {
    let res;
    if (!status) {
        res = await instanceAxios.get(`/order-services/${mechanicId}?page=${page}`)
    } else {
        res = await instanceAxios.get(`/order-services/${mechanicId}?status=${status}&page=${page}`)
    }

    return res.data.orderServices
}   
