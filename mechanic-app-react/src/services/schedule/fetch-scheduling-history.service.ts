import { instanceAxios } from "../../lib/axios";

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

interface FetchSchedulingHistoryServiceQuery {
    page: number;
    status?: string;
}
export async function FetchSchedulingHistoryService({
    page,
    status
}: FetchSchedulingHistoryServiceQuery): Promise<FetchSchedulingHistoryResponse> {
    let res;
    if (!status) {
        res = await instanceAxios.get(`/schedules/history?page=${page}`)
    } else {
        res = await instanceAxios.get(`/schedules/history?status=${status}&page=${page}`)
    }
    const { data } = res

    return data
} 