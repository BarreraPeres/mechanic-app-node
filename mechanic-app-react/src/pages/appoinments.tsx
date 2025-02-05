import { PencilIcon } from "lucide-react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ptBR from 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import { FetchSchedulingHistoryService } from "../services/fetch-scheduling-history.service";
import { useQuery } from "@tanstack/react-query";

dayjs.locale(ptBR)
dayjs.extend(utc);


export function Appointments() {
    const navigate = useNavigate()

    function TypeBadge(type: "REPAIR" | "MAINTENANCE" | "INSPECTION"): string[] {
        if (type === 'REPAIR') {
            return ["text-amber-500 rounded-lg text-sm", "Reparo"]
        } else if (type === 'MAINTENANCE') {
            return ["text-blue-500 rounded-lg text-sm", "Manutenção"]
        } else {
            return ["text-green-500 rounded-lg text-sm", "Inspeção"]
        }
    };


    function StatusBadge(status: string): string[] {
        if (status === 'SCHEDULED') {
            return ["bg-green-500 text-green-100 rounded-lg text-sm w-20 h-6 flex items-center justify-center", "Agendado"]
        } else if (status === 'PENDING') {
            return ["bg-amber-500 text-yellow-200  rounded-lg text-sm w-20 h-6 flex items-center justify-center", "Pendente"]
        } else {
            return ["bg-blue-500 text-blue-100 rounded-lg text-sm w-20 h-6 flex items-center justify-center", "Finalizado"]
        }
    };


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
                <p className="flex justify-start items-start text-zinc-300">Consulte Seus Agendamentos</p>
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

                {data.schedules.map((s) => {

                    if (!s.mechanic || !s.vehicle) {
                        throw new Error("Oooh something is not right")
                    }

                    const content = s.request_at
                    const requestAt = dayjs(content, "pt").utc().format("D [de] MMMM [às] HH [da] A")
                    let [days, period] = requestAt.split("da")
                    const year = dayjs().format("YYYY")
                    const date = period === "AM" ? "manhã" : "tarde"
                    days = (days + "da" + " " + date + " de " + year)



                    return (

                        <div className="
                        flex 
                        flex-col
                        p-4
                        h-auto
                        w-[240px]
                        bg-zinc-950
                        rounded-lg">
                            <div
                                key={s.request_at.toString()}
                                className="flex justify-between gap-3">
                                <div className="font-bold gap-1">
                                    Serviço
                                </div>
                                <div
                                    className={StatusBadge(s.status)[0]}
                                >
                                    {StatusBadge(s.status)[1]}
                                </div>
                            </div >
                            <div
                                className="
                                w-auto 
                                ">
                                <span
                                    className="
                                text-sm
                                mb-2
                                flex
                                text-green-400
                                ">
                                    Solicitado para {days}
                                </span>
                                <label
                                    className="
                                font-bold
                                ">
                                    Oficina:
                                </label>
                                <span
                                    className="
                                flex
                                font-sans
                                text-sm
                                text-zinc-300
                                ">
                                    {s.mechanic.name}
                                </span>
                                <label
                                    className="
                                block mt-2 font-bold
                                ">
                                    Descrição:
                                </label>
                                <p
                                    className="
                                text-sm
                                font-sans
                                text-zinc-300
                                ">
                                    {s.description}
                                </p>

                                <div className=" flex flex-col">
                                    <label
                                        className="
                                        block mt-2 font-bold
                                        ">
                                        Tipo do Serviço:
                                    </label>
                                    <span
                                        className=
                                        {TypeBadge(s.type)[0]}
                                    >
                                        {TypeBadge(s.type)[1]}
                                    </span>
                                </div>
                                <div className="flex justify-end items-end mt-4">
                                    <button onClick={() => navigate(`/schedule/${s.id}/update`)}> <PencilIcon /> </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}