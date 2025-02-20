import dayjs from "dayjs";
import ptBR from 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import { FetchSchedulingHistoryService } from "../services/schedule/fetch-scheduling-history.service";
import { useQuery } from "@tanstack/react-query";
import { ScheduleCard } from "../components/schedule/schedule-card";

dayjs.locale(ptBR)
dayjs.extend(utc);


export function Appointments() {

    const { data } = useQuery({
        queryKey: ["fetch scheduling history"],
        queryFn: () => FetchSchedulingHistoryService(),
        staleTime: 1000 * 60 // 1 minutes
    })

    if (!data) {
        return (<div>Loading...</div>)
    }


    return (
        <div>
            <div className="flex flex-col">
                <h1 className="text-lg font-bold">Sua Agenda</h1>
                <p className="
                flex 
                justify-start
                 items-start
                  text-zinc-300
                  ">Consulte Seus Agendamentos
                </p>
            </div>

            <div
                className="
                    flex
                    mt-16
                    rounded-sm
                    h-auto
                    w-auto
                    gap-3 
                        ">

                <ScheduleCard schedules={data.schedules}></ScheduleCard>

            </div>
        </div >
    )
}