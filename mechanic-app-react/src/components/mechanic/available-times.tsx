import { useQuery } from "@tanstack/react-query";
import { HiCalendar } from "react-icons/hi";
import { GetTimesByMechanicIdService } from "../../services/mechanic/get-times-by-mechanic-id.service";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Clock, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";


export function AvailableTimes() {
    const { id } = useParams()
    const [showTime, setTime] = useState<string>("")
    const navigate = useNavigate()

    if (!id) { return <div>Loading...</div> }

    const { data: times, isLoading } = useQuery({
        queryKey: ["get times by mechanic id"],
        queryFn: () => GetTimesByMechanicIdService({ mechanicId: id }),
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })
    const today = dayjs().format("dddd, D MMMM " + dayjs().format("YYYY"))

    if (!times || !times.avaliebleTimes || isLoading) { return (<Skeleton />) }


    return (
        <div>
            <div className="p-4"><strong> Horários Disponíveis {today} </strong></div>
            <ol className="items-center sm:flex p-2">
                {times.avaliebleTimes.map((time, idx) => {
                    return (
                        <li className="relative mb-6 sm:mb-0" key={idx}>
                            <div className="flex items-center">
                                <button
                                    onClick={() => document.querySelectorAll("time").forEach(() => {
                                        setTime(time)
                                    })}
                                    className="
                                    z-10
                                    flex
                                    items-center
                                    justify-center 
                                    w-6 
                                    h-6
                                    bg-blue-100
                                    rounded-full 
                                    ring-0
                                    ring-white 
                                    sm:ring-8
                                    shrink-0">
                                    <HiCalendar
                                        className="
                                        size-16
                                        text-green-900
                                        "/>
                                </button>
                                <div
                                    className="
                                    hidden
                                    sm:flex 
                                    w-full
                                    bg-gray-200
                                    h-0.5
                                    ">
                                </div>
                            </div>
                            <div
                                className="
                                mt-3
                                sm:pe-8">
                                <time
                                    id="time"
                                    className="
                                    text-sm
                                    font-normal
                                    leading-none
                                    text-gray-400
                                ">
                                    {time}
                                </time>
                            </div>
                        </li>
                    )
                }
                )}
            </ol>

            <div
                className="flex flex-col items-center gap-2"
            >
                <strong
                    className="
                    font-semibold 
                    text-lg
                    ">
                    Cadastre um serviço com Mechanica do salve
                </strong>
                <p className="flex">Selecione Um Horário </p>

                <div
                    className="
                    flex 
                    p-2
                    gap-1
                    text-white
                    rounded-md
                    ">
                    {showTime}
                    <Clock />
                </div>

                <Button
                    onClick={() => navigate(`/create-schedule/${id}&${showTime}`)}
                >
                    Cadastrar
                    <Plus
                        size={16}
                    />
                </Button>
            </div>


        </div>
    )
}


