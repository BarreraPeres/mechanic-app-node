import { Check, X } from "lucide-react"
import { DialogTrigger } from "../../components/ui/dialog"
import { Schedule } from "../../services/schedule/fetch-scheduling-history.service"
import dayjs from "dayjs"


interface SchedulesProps {
    schedules: Schedule[],
    setSchedule: (schedule: Schedule) => void
}

export function Schedules({ schedules, setSchedule }: SchedulesProps) {
    return (
        <div className="p-2 rounded-lg ">
            {schedules.length > 0 ? (
                schedules.map((s) => (
                    <div
                        key={s.id}
                        className="
                            flex 
                            flex-col
                            justify-between
                            items-start
                            sm:items-center
                            sm:flex-row
                        ">
                        <div className="
                        w-full 
                        sm-w-auto
                        ">
                            <header className="flex justify-between">
                                <h3 className="
                                    font-semibold 
                                    text-lg">
                                    {s.vehicle?.model} - {s.vehicle?.year}
                                </h3>

                                <div
                                    className="
                                    text-green-500
                                    gap-1
                                    flex"
                                >
                                    <p className="text-sm">Pedido em</p>
                                    <p className="
                                    text-zinc-500
                                    text-sm
                                    flex
                                    ">{dayjs(s.request_at.toString())
                                            .format("DD/MM HH:mm")}
                                    </p>
                                </div>
                            </header>
                            <p className="
                                    text-zinc-500
                                    md:text-sm
                                    flex
                                ">
                                <p className="
                                    text-green-500
                                    mr-1">
                                    Descrição:
                                </p>
                                {s.description}
                            </p>
                            <div className="
                                    flex 
                                    items-center
                                    mt-2
                                    justify-between 
                                    text-zinc-400
                                    sm:items-start
                                    gap-4
                                ">

                                <span className="sm:flex sm:flex-row ">
                                    Solicita para { }
                                    {dayjs(s.scheduled_for.toString())
                                        .format("DD/MM [às] HH:MM ")}

                                </span>
                                <div className="space-x-2 flex">
                                    <DialogTrigger asChild>
                                        <button
                                            onClick={() => {
                                                setSchedule(s)
                                            }}
                                            className="
                                         p-2
                                        bg-green-500
                                        text-white
                                        rounded-lg
                                        hover:bg-green-600
                                        sm:px-1
                                        sm:py-1
                                    ">
                                            <Check className="w-5 h-5" />
                                        </button>
                                    </DialogTrigger>
                                    <button
                                        className="
                                    p-2
                                    bg-red-500
                                    text-white 
                                    rounded-lg
                                    hover:bg-red-600
                                    sm:px-1
                                    sm:py-1
                                ">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <hr className="my-2" />
                        </div>
                    </div>
                ))) : (
                <div
                    className="
                        flex 
                        items-center 
                        justify-center
                        h-64
                        ">
                    <p className="
                        text-zinc-400
                    ">
                        Nenhuma solicitação de serviço.
                    </p>
                </div>
            )}
        </div>
    )
}