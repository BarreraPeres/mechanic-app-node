import { Bell, Calendar, ChevronLeft, ChevronRight, CircleAlert, PiggyBank, TrendingDown, TrendingUp, UsersRound, Wrench, X } from "lucide-react";
import { Schedules } from "./schedules";
import { FetchSchedulingHistoryService, Schedule } from "../../services/schedule/fetch-scheduling-history.service";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogClose, DialogContent } from "../../components/ui/dialog";
import { OrdersService } from "./order-services";
import { FetchOrderService } from "../../services/order-services/fetch-order-service.service";
import { useEffect, useState } from "react";
import { GetMechanicsService } from "../../services/mechanic/get-mechanics.service";
import { Skeleton } from "../../components/ui/skeleton";
import { IssueOrderServiceFormData, IssueOrderServiceForm } from "./issue-order-service-form";
import { IssueOrderService } from "../../services/order-services/issue-order.service";

export function DashboardPage() {
    const [schedule, setSchedule] = useState<Schedule>("" as any)
    const [orderPage, setOrderPage] = useState<number>(0)

    function handleSchedule(schedule: Schedule) {
        setSchedule(schedule)
    }

    async function handleIssueOrderService(_data: IssueOrderServiceFormData) {
        try {
            if (!schedule) { return }

            const schedule_id = schedule.id
            const data = {
                ..._data,
                schedule_id
            }
            await IssueOrderService(data)
            refetchSchedule()
            refetchServices()
            alert("Simples e fácil de componentizar um formulário 😆")
        } catch (err) {
            window.error(err)
        }
    }

    const { data: schedules, refetch: refetchSchedule } = useQuery({
        queryKey: ["fetch scheduling history"],
        queryFn: () => FetchSchedulingHistoryService({
            page: 0,
            status: "PENDING",
        }),
        staleTime: 1000 * 60 // 1 minute
    })


    const [mechanic, setMechanic] = useState<any>("")
    const { data: mechanics } = useQuery({
        queryKey: ["get mechanics"],
        queryFn: () => GetMechanicsService(),
        staleTime: 1000 * 60 * 24 // 1 day
    })
    useEffect(() => {
        if (mechanics) {
            setMechanic(mechanics.userWithMechanics.mechanic[0])
            console.log("mechanic", mechanic)
        }
    }, [mechanics])


    const { data: OrderServices, refetch: refetchServices } = useQuery({
        queryKey: ["fetch orderService", orderPage],
        queryFn: () => FetchOrderService({
            mechanicId: mechanic.id,
            page: orderPage,
            // status: "PENDING",
        }),
        enabled: !!mechanic
    })
    console.log("orderPage", orderPage)

    if (!OrderServices ||
        !mechanics
    ) { return (<Skeleton />) }


    if (!schedules || !schedules.schedules) {
        return <div>Carregando...</div>
    }
    console.log(schedules)
    return (
        <div
            className="
            flex 
            flex-col
            gap-4
            w-full
        ">
            <div
                className="
                flex 
                justify-between
                items-center
                bg-zinc-800
                p-4    
                rounded-lg
            ">
                <h1>
                    Dashboard
                    <p>Bem-vindo.</p>
                </h1>
                <p className="flex items-end mr-8"><Bell /></p>
            </div>

            <div
                className="
                 grid
                 grid-cols-4
                 space-x-5                
                 w-auto
                ">
                <div
                    id="card-1"
                    className="
                        bg-zinc-800
                        rounded-lg
                        p-4
                        flex
                        flex-col
                ">
                    <div className="
                        gap-4
                        flex 
                        justify-between
                    ">
                        <div
                            className="
                            gap-2 flex flex-col">
                            <p>Agendamentos Hoje</p>
                            <span
                                className="
                                text-3xl
                             ">
                                12
                            </span>
                        </div>

                        <div className="
                        flex
                        items-center
                        p-2
                        h-10
                        w-10
                        rounded-full
                        bg-blue-500
                        ">
                            <Calendar />
                        </div>

                    </div>
                    <div className="
                        flex 
                        p-2 
                        text-green-500
                        gap-2
                        mt-auto
                        text-sm
                            font-bold
                    ">
                        <TrendingUp />
                        <p>
                            { }5% a mais que ontem
                        </p>
                    </div>
                </div>

                <div
                    id="card-2"
                    className="
                        bg-zinc-800
                        rounded-lg
                        p-4
                        flex
                        flex-col
                ">
                    <div className="
                        gap-4
                        flex 
                        justify-between
                    ">
                        <div
                            className="
                            gap-2 
                            flex
                            flex-col
                        ">
                            <p>Serviços Em Andamento</p>
                            <span
                                className="
                                text-3xl
                             ">
                                12
                            </span>
                        </div>

                        <div className="
                        flex
                        items-center
                        p-2
                        h-10
                        w-10
                        rounded-full
                        bg-yellow-500
                        ">
                            <Wrench />
                        </div>

                    </div>
                    <div className="
                        flex 
                        p-2 
                        text-red-500
                        gap-2
                        mt-auto
                        text-sm
                        font-bold
                    ">
                        <TrendingDown />
                        <p>
                            { }5% a menos que ontem
                        </p>
                    </div>
                </div>

                <div
                    id="card-3"
                    className="
                        bg-zinc-800
                        rounded-lg
                        p-4
                        flex
                        flex-col
                ">
                    <div className="
                        gap-4
                        flex 
                        justify-between
                    ">
                        <div
                            className="
                            gap-2 
                            flex
                            flex-col
                        ">
                            <p>Funcionários Ativos</p>
                            <span
                                className="
                                text-3xl
                             ">
                                6
                            </span>
                        </div>

                        <div className="
                        flex
                        items-center
                        p-2
                        h-10
                        w-10
                        rounded-full
                        bg-green-500
                        ">
                            < UsersRound />
                        </div>
                    </div>
                    <a
                        href="/mechanic/employees"
                        className="
                        flex 
                        p-2 
                        text-blue-500
                        gap-2
                        mt-10
                        text-sm
                    ">
                        <CircleAlert />
                        <p>
                            { } Ver Meus Funcionários
                        </p>
                    </a>
                </div>
                <div
                    id="card-4"
                    className="
                        bg-zinc-800
                        rounded-lg
                        p-4
                        flex
                        flex-col
                ">
                    <div className="
                        gap-4
                        flex 
                        justify-between
                    ">
                        <div
                            className="
                            gap-2 
                            flex
                            flex-col
                        ">
                            <p>Faturamento do mês</p>
                            <span
                                className="
                                text-3xl
                             ">
                                R$ 12.000
                            </span>
                        </div>

                        <div className="
                        flex
                        items-center
                        p-2
                        h-10
                        w-10
                        rounded-full
                        bg-purple-500
                        ">
                            < PiggyBank />
                        </div>

                    </div>
                    <a
                        href="/mechanic/financial"
                        className="
                        flex 
                        p-2 
                        text-green-500
                        gap-2
                        mt-10
                        text-sm
                    ">
                        <TrendingUp />
                        <p>
                            { } Acima da Meta
                        </p>
                    </a>
                </div>
            </div>
            <main
                className="grid grid-cols-3 mt-4 gap-4"
            >
                <div
                    className="  
                        flex
                        flex-col
                        p-4
                        gap-4
                        rounded-lg
                        bg-zinc-800
                        w-full
                        col-span-2
                ">
                    <header
                        className="
                        flex
                        justify-between
                    ">
                        <h1>Ordem de Serviços</h1>
                        <a
                            href="/mechanic/appointments"
                            className="
                            text-green-500
                            font-medium
                            text-sm
                            duration-200
                            hover:text-green-600
                        ">
                            Ver Todos
                        </a>
                    </header>

                    <OrdersService
                        orderServices={OrderServices.orderServices}
                    >
                    </OrdersService>
                    <div className="flex justify-end">
                        <ChevronLeft
                            onClick={() => {
                                if (orderPage <= 0) return

                                setOrderPage(orderPage - 1)
                            }}
                            className="
                            text-green-500
                            hover:text-green-800"
                        />
                        <ChevronRight
                            onClick={() => setOrderPage(orderPage + 1)}
                            className="
                            text-green-500
                            hover:text-green-800"
                        />
                        <p className="flex items-center gap-2">
                            <p
                                className="text-sm flex">
                                página:
                            </p>
                            {orderPage}
                        </p>
                    </div>
                </div>

                <div className="bg-zinc-800 p-4 flex flex-col gap-4 rounded-lg">
                    <header
                        className="
                        flex
                        justify-between
                    ">
                        <h1>Solicitações de Agendamento</h1>
                        <a
                            href="/mechanic/appointments"
                            className="
                            text-green-500
                            font-medium
                            text-sm
                            duration-200
                            hover:text-green-600
                        ">
                            Ver Todos
                        </a>
                    </header>
                    <Dialog>
                        <Schedules
                            schedules={schedules.schedules}
                            setSchedule={handleSchedule}
                        ></Schedules>
                        <DialogContent>
                            <div className="p-1 w-full">
                                <DialogClose
                                    className="
                                flex
                                justify-end
                                w-full
                                "
                                >
                                    <X className="size-5" />
                                </DialogClose>

                                <h1
                                    className="text-zinc-300 text-lg font-bold "
                                >
                                    Emitir ordem de serviço
                                </h1>
                                <IssueOrderServiceForm
                                    schedule={schedule}
                                    onSubmit={handleIssueOrderService}
                                ></IssueOrderServiceForm>

                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </main>

        </div>
    )
}