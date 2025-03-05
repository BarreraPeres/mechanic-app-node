import { instanceAxios } from "../../lib/axios"


interface GetOrderServiceParms {
    orderServiceId: string
}
export interface GetOrderServiceRes {
    orderService: {
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
        mechanic: {
            id: string;
            name: string;
            phone: string;
            latitude: string;
            longitude: string;
        }
        vehicle: {
            id: string;
            brand: string;
            plate: string;
            model: string;
            year: number;
            user_id: string;
        }
    }
}

export async function GetOrderService({
    orderServiceId
}: GetOrderServiceParms): Promise<GetOrderServiceRes> {
    const res = await instanceAxios.get(`/order-service/${orderServiceId}`)

    return res.data.orderServices
}   
