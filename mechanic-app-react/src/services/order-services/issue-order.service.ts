import { instanceAxios } from "../../lib/axios"


interface IssueOrderServiceBody {
    schedule_id: string
    value: number
    description: string
    materials?: string | undefined
    start_date: Date
    end_date: Date
}

export async function IssueOrderService({
    schedule_id, description, end_date, start_date, value, materials
}: IssueOrderServiceBody): Promise<any> {
    console.log(schedule_id, description, end_date, start_date, value, materials)
    const res = await instanceAxios.post(`/order-service/${schedule_id}/issue`,
        {
            description,
            materials,
            value,
            start_date,
            end_date
        }
    )

    return res.data
}   
