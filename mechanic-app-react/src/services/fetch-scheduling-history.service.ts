import { instanceAxios } from "../lib/axios";

interface FetchSchedulingHistoryResponse {
    schedules: {
        id: string;
        request_at: Date;
        status: string;
        scheduled_for: Date;
        type: 'REPAIR' | 'MAINTENANCE' | 'INSPECTION',
        description: string;
        user_id: string;
        vehicle: {
            id: string,
            model: string,
            plate: string,
            year: number,
            user_id: string,
        } | null;
        mechanic: {
            id: string,
            name: string,
            phone: string | null,
            latitude: number,
            longitude: number
        } | null;
    }[]
}


export async function FetchSchedulingHistoryService(): Promise<FetchSchedulingHistoryResponse> {
    const res = await instanceAxios.get("/schedules/history")
    const { data } = res
    console.log(data)

    return data
} 