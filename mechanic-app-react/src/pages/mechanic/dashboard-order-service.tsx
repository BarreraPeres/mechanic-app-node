import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GetOrderService } from "../../services/order-services/get-order-service.service";
import { Skeleton } from "../../components/ui/skeleton";
import { renderStatus } from "./dashboard";
import dayjs from "dayjs";
import { Button } from "../../components/ui/button";
import { HelpCircle } from "lucide-react";


function messageOfStatus(status: string): string {
    if (status === "PENDING") {
        return "O serviço está pendente. Após a aprovação do cliente, o veículo poderá ser recebido para o serviço."
    } else if (status === "IN_PROGRESS") {
        return "O serviço está em andamento. Aguarde o técnico finalizar o serviço."
    } else if (status === "FINISHED") {
        return "O serviço foi finalizado. O veículo já pode ser retirado."
    } else if (status === "CANCELED") {
        return "O serviço foi cancelado. O veículo não pode ser recebido para o serviço."
    } else if (status === "SCHEDULED") {
        return "O serviço está agendado. Aguarde o cliente entregar o veiculo para o serviço."
    } else {
        return "Status desconhecido"
    }
}

export function DashboardOrderService() {
    const { orderServiceId } = useParams()
    const { data: os } = useQuery({
        queryKey: ["get mechanics"],
        queryFn: () => GetOrderService({ orderServiceId: orderServiceId! }),
        staleTime: 1000 * 60 // one minute
    })

    console.log("orderService.orderService.description", os)
    if (!os) return (< Skeleton />)

    return (
        <div className="
            gap-4
            flex
            flex-col
        ">

            <div
                className="
                    flex
                    justify-between
                    flex-1
            ">
                <h1 className="
                    text-xl
                    mt-2
                    font-bold
                    text-zinc-300
                    flex
                ">
                    Ordem De Serviço
                </h1>
                <p
                    className={`
                    flex
                    justify-center
                    mr-2
                    rounded-md
                    w-40
                    py-2
                    ${renderStatus(
                        os.orderService.status).color}
                    `}
                >
                    {renderStatus(os.orderService.status).nameInPortuguese}
                </p>
            </div>

            <hr className="my-2" />
            <div className="
                 grid
                 grid-cols-2
                 gap-10
            ">
                <main id="details-order-service"
                    className="
                bg-zinc-800
                rounded-md 
                p-4
            ">
                    <div className="
                    flex 
                    flex-col
                    gap-2
                ">
                        <h1
                            className="
                        text-zinc-300
                        text-lg
                        font-bold
                    ">
                            Detalhes da Ordem
                        </h1>
                        <p>
                            <span
                                className="text-green-500">
                                Aceito em:
                            </span> { }
                            {dayjs(os.orderService.created_at.toString())
                                .format("dddd, D MMMM ")}</p>
                        <p className="flex">
                            <span
                                className="text-green-500">Status:
                            </span>
                            <span
                                className={
                                    `flex
                                     ml-2
                                     rounded-lg
                                     px-1 
                                     ${renderStatus(os.orderService.status).color}`
                                }>
                                {renderStatus(os.orderService.status).nameInPortuguese}
                            </span>
                        </p>
                        <p>
                            <span
                                className="text-green-500">
                                Descrição:
                            </span> { }
                            {os.orderService.description}</p>
                        <p
                            className="underline font-bold">
                            <span
                                className="text-green-500">
                                R$ { }
                            </span>
                            {os.orderService.value}
                        </p>
                    </div>

                </main>
                <main
                    className="
                    bg-zinc-800
                    rounded-md
                    p-4
                    gap-2
                    flex
                    flex-col
                ">
                    <h1
                        className="
                        text-zinc-300
                        text-lg
                        font-bold
                    ">
                        Agendamento
                    </h1>
                    <p>
                        <span
                            className="
                            text-green-500 
                            underline
                            font-bold
                        ">
                            Data de Inicio:
                        </span> { }
                        {dayjs(os.orderService.start_date.toString())
                            .format("dddd, D [de] MMMM [às] hh:mm ")}
                    </p>
                    <p>
                        <span
                            className="
                            text-green-500
                            font-bold
                            underline
                        ">
                            Data de Término:
                        </span> { }
                        {dayjs(os.orderService.end_date.toString())
                            .format("dddd, D [de] MMMM [às] hh:mm ")}
                    </p>
                    <p
                        className="
                        flex 
                        space-x-2
                    ">
                        <span
                            className="
                            text-green-500
                        ">
                            Veículo:
                        </span> { }
                        <p>{os.orderService.vehicle.model} - {os.orderService.vehicle.year}</p>

                    </p>
                </main>

            </div>
            <>
                <div
                    className="
                            mt-10
                            bg-zinc-800
                            rounded-lg
                            p-8
                            flex 
                            h-full
                            flex-col
                            gap-4
                        ">
                    <h1>
                        {messageOfStatus(os.orderService.status)}
                    </h1>
                    <div className="flex justify-end">
                        <Button
                            onClick={() => window.location.href = "/help/order-services/service-pending"}>
                            <HelpCircle />
                            Precisa de ajuda
                        </Button>
                    </div>
                </div>
            </>

        </div>
    )
}

