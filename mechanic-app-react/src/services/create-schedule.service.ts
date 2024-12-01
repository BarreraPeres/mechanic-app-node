import { instanceAxios } from "../lib/axios";

export interface CreateScheduleServiceBody {
    scheduled_for: Date
    description: string
    vehicle_id: string
    mechanic_id: string
    type: string
}

export async function CreateScheduleService({
    description,
    mechanic_id,
    scheduled_for,
    type,
    vehicle_id }: CreateScheduleServiceBody) {
    await instanceAxios.post("/scheduling",
        {
            description,
            mechanic_id,
            scheduled_for,
            type,
            vehicle_id
        }
    )
}