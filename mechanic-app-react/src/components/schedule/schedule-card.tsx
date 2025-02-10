import dayjs from "dayjs";
import { PencilIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EmptySchedule } from "./empty-schedule";

interface ScheduleCardProps {
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


export function ScheduleCard({ schedules }: ScheduleCardProps) {
    if (schedules.length === 0 || !schedules) {
        return <EmptySchedule />
    }

    function StatusBadge(status: string): string[] {
        if (status === 'SCHEDULED') {
            return ["bg-green-500 text-green-100 rounded-lg text-sm w-20 h-6 flex items-center justify-center", "Agendado"]
        } else if (status === 'PENDING') {
            return ["bg-amber-500 text-yellow-200  rounded-lg text-sm w-20 h-6 flex items-center justify-center", "Pendente"]
        } else {
            return ["bg-blue-500 text-blue-100 rounded-lg text-sm w-20 h-6 flex items-center justify-center", "Finalizado"]
        }
    };

    function TypeBadge(type: "REPAIR" | "MAINTENANCE" | "INSPECTION"): string[] {
        if (type === 'REPAIR') {
            return ["text-amber-500 rounded-lg text-sm", "Reparo"]
        } else if (type === 'MAINTENANCE') {
            return ["text-blue-500 rounded-lg text-sm", "Manutenção"]
        } else {
            return ["text-green-500 rounded-lg text-sm", "Inspeção"]
        }
    };

    return (

        <div
            className="
            grid
            grid-cols-4
            gap-4
        ">
            {schedules.map((s) => {
                if (!s.vehicle || !s.mechanic) return
                const navigate = useNavigate()
                const content = s.request_at
                const requestAt = dayjs(content, "pt").utc().format("D [de] MMMM [às] HH [da] A")
                let [days, period] = requestAt.split("da")
                const year = dayjs().format("YYYY")
                const date = period === "AM" ? "manhã" : "tarde"
                days = (days + "da" + " " + date + " de " + year)

                return (
                    <div>
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
                            </div>
                            <div
                                className="
                            w-auto 
                            flex
                            flex-col
                            gap-1
                            ">
                                <span
                                    className="
                                text-sm
                                mt-2
                                flex
                                text-green-400
                                ">
                                    Solicitado para {days}
                                </span>

                                <p
                                    className="
                                    flex
                                    mt-2 
                                    font-bold
                                    ">
                                    Tipo do Serviço:
                                </p>
                                <span
                                    className=
                                    {TypeBadge(s.type)[0]}
                                >
                                    {TypeBadge(s.type)[1]}
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
                                block
                                mt-2
                                font-bold
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

                                <div
                                    className="
                                flex
                                justify-end
                                items-end
                                mt-4">
                                    <button
                                        onClick={() => navigate(`/schedule/${s.id}/update`)}>
                                        <PencilIcon size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div >
    )
}