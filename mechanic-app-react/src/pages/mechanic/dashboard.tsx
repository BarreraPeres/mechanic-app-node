import { useEffect, useState } from 'react';
import { Calendar, Clock, Check, X, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { FetchSchedulingHistoryService } from '../../services/schedule/fetch-scheduling-history.service';
import { FetchOrderService } from '../../services/order-services/fetch-order-service.service';
import { GetMechanicsService } from '../../services/mechanic/get-mechanics.service';
import { DropDown } from '../../components/ui/dropdown';
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from '../../components/ui/radio-group';
import dayjs from 'dayjs';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/ui/input';
import { IssueOrderService } from '../../services/order-services/issue-order.service';
import { Skeleton } from '../../components/ui/skeleton';


const IssueOrderServiceForm = z.object({
    schedule_id: z.string().optional(),
    description: z.string().min(1, 'Campo obrigatório'),
    materials: z.string().optional(),
    value: z.coerce.number().min(1, "Campo obrigatório"),
    start_date: z.coerce.date(),
    end_date: z.coerce.date()
})

type issueOrderServiceForm = z.infer<typeof IssueOrderServiceForm>

export function renderStatus(status: string): { color: string, nameInPortuguese: string } {
    if (status === "PENDING") {
        const color = "bg-yellow-100 text-yellow-800"
        const nameInPortuguese = "Pendente"
        return {
            color,
            nameInPortuguese
        }
    } else if (status === "IN_PROGRESS") {
        const color = "bg-green-100 text-green-800"
        const nameInPortuguese = "Aceito"

        return {
            color,
            nameInPortuguese
        }
    } else {
        const color = "bg-red-100 text-red-800"
        const nameInPortuguese = "Finalizado"
        return {
            color,
            nameInPortuguese
        }
    }

}
export function Dashboard() {
    const [schedule, setSchedule] = useState<any>("")
    const { handleSubmit, register, formState } = useForm<issueOrderServiceForm>({
        resolver: zodResolver(IssueOrderServiceForm)
    })
    async function handleIssueOrderService(_data: issueOrderServiceForm) {
        try {
            if (!schedule.id) { return }

            const schedule_id = schedule.id
            const data = {
                ..._data,
                schedule_id
            }
            await IssueOrderService(data)
            refetchSchedule()
            refetchServices()
            alert("O Serviço foi proposto, o cliente será notificado, aguarde a resposta")
        } catch (err) {
            window.error(err)
        }
    }

    const [activeTab, setActiveTab] = useState('pending');
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

    const { data: schedules, refetch: refetchSchedule } = useQuery({
        queryKey: ["fetch scheduling history"],
        queryFn: () => FetchSchedulingHistoryService({
            page: 0,
            status: "PENDING",
        }),
        staleTime: 1000 * 60 // 1 minute
    })
    const { data: OrderServices, refetch: refetchServices } = useQuery({
        queryKey: ["fetch orderService"],
        queryFn: () => FetchOrderService({
            mechanicId: mechanic.id,
            page: 0,
            // status: "PENDING",
        }),
        enabled: !!mechanic
    })

    if (!OrderServices ||
        !schedules ||
        !mechanics
    ) { return (<Skeleton />) }


    return (
        <div className="min-h-screen">
            <div className="ml-6 justify-between items-center flex">
                <h1 className="text-2xl font-bold 
                   bg-gradient-to-r 
                    from-green-600
                    via-green-500
                    to-green-900
                    inline-block 
                    text-transparent
                    bg-clip-text">Minha Oficina
                </h1>
            </div>

            <div className="p-6">
                <div className="flex space-x-4 mb-6">
                    <button
                        className={`px-4 py-2 rounded-lg 
                            ${activeTab === 'pending' ?
                                'bg-green-600 text-white' :
                                'bg-green-200 text-gray-700'
                            }`}
                        onClick={() => setActiveTab('pending')}
                    >
                        Solicitações de serviços
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg
                             ${activeTab === 'accepted' ?
                                'bg-green-600 text-white' :
                                'bg-green-200 text-gray-700'
                            }`}
                        onClick={() => setActiveTab('accepted')}
                    >
                        Serviços em Andamento

                    </button>
                    {activeTab === "accepted" && (
                        <DropDown title="Selecionar Mecânica"
                            className="
                            p-2
                            text-sm
                            font-normal
                            ring-0
                            tracking-tight
                            outline-none
                            text-current
                            bg-zinc-950
                        " >
                            <RadioGroup>
                                {mechanics.userWithMechanics.mechanic.map((m) => (
                                    < RadioGroupItem
                                        key={m.id}
                                        value={m.id}
                                        onChange={() => { refetchServices(), setMechanic(m) }}
                                        onClick={() => { refetchServices(), setMechanic(m) }}
                                        className="
                                        text-xs
                                        font-normal
                                        p-2
                                        gap-1
                                        items-stretch"
                                    >
                                        <RadioGroupIndicator />
                                        {m.name}
                                    </RadioGroupItem>
                                ))}
                            </RadioGroup>
                        </DropDown>
                    )}
                </div>
                <Dialog>
                    <div className="grid grid-cols-1 gap-6">
                        {activeTab === 'pending' ? (
                            <>
                                <div>
                                    <div>
                                        <div
                                            className="
                                        text-green-700
                                        flex
                                        mb-4
                                        items-center
                                      ">
                                            <Calendar className="mr-2" />
                                            Serviços Pendentes
                                        </div>
                                    </div>
                                    <div>
                                        {schedules.schedules.length > 0 ? (schedules.schedules.map((s) => (
                                            <div key={s.id} className="mb-4 p-4  rounded-lg bg-zinc-950">
                                                <div className="flex justify-between items-center">
                                                    <div>

                                                        <h3 className="
                                                    font-semibold 
                                                    text-lg">
                                                            {s.vehicle?.model} - {s.vehicle?.year}
                                                        </h3>
                                                        <p className="
                                                    text-zinc-500
                                                    ">
                                                            {s.description}
                                                        </p>
                                                        <div className="
                                                        flex 
                                                        items-center
                                                        mt-2
                                                        text-zinc-400
                                                      ">
                                                            <Calendar className="w-4 h-4 mr-2" />
                                                            <span>
                                                                pedido em { }
                                                                {dayjs(s.request_at.toString())
                                                                    .format("dddd, D MMMM ")}
                                                            </span>
                                                            <Clock className="w-4 h-4 ml-4 mr-2" />
                                                            <span>
                                                                solicitado para { }
                                                                {dayjs(s.scheduled_for.toString())
                                                                    .format("dddd, D MMMM ")}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex space-x-2">
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
                                                        ">
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))) : (
                                            <div
                                                className="
                                            flex 
                                            items-center 
                                            justify-center
                                            h-64">
                                                <p className="
                                            text-zinc-400
                                            ">
                                                    Nenhuma solicitação de serviço.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <div>
                                        <div className="
                                    text-green-700
                                     flex items-center
                                     mb-4   
                                     ">
                                            <Clock className="mr-2" />
                                            Meus Serviços
                                        </div>
                                    </div>
                                    <div>
                                        {OrderServices.orderServices?.length > 0 ? (
                                            OrderServices.orderServices?.map((os) => (
                                                <div key={os.id}
                                                    className="
                                                mb-4
                                                p-4
                                                rounded-lg
                                                bg-zinc-950
                                            ">
                                                    <div
                                                        className="
                                                    flex 
                                                    justify-between
                                                    items-center
                                                 ">
                                                        <div>
                                                            <h3
                                                                className="
                                                        font-semibold
                                                        text-lg
                                                         ">
                                                                {os.vehicle.model} - {os.vehicle.year}
                                                            </h3>
                                                            <p
                                                                className="text-zinc-500"
                                                            >
                                                                {os.description}
                                                            </p>
                                                            <p className="
                                                        text-green-600
                                                        ">
                                                                R$ {os.value}
                                                            </p>
                                                            <div
                                                                className="
                                                            flex
                                                            items-center
                                                            mt-2
                                                            text-zinc-400
                                                        ">
                                                                <Calendar
                                                                    className="w-4 h-4 mr-2" />
                                                                <span>
                                                                    Aceito Em { }
                                                                    {dayjs(os.start_date.toString())
                                                                        .format("dddd, D MMMM, HH:mm")}
                                                                </span>
                                                                <Clock
                                                                    className="w-4 h-4 ml-4 mr-2" />
                                                                <span>
                                                                    Para { }
                                                                    {dayjs(os.end_date.toString())
                                                                        .format("dddd, D MMMM, HH:mm")}
                                                                </span>
                                                            </div>
                                                            <p className="mt-2 text-gray-700">
                                                                {os.materials}
                                                            </p>
                                                        </div>
                                                        <a
                                                            href={`/dashboard/${os.id}`}
                                                        >
                                                            <div className="flex items-center">
                                                                <span
                                                                    className=
                                                                    {`
                                                                px-3
                                                                py-1
                                                                rounded-full
                                                                text-sm
                                                                ${renderStatus(os.status).color}`}
                                                                >
                                                                    {renderStatus(os.status).nameInPortuguese}
                                                                </span>
                                                                <ChevronRight
                                                                    className="
                                                                    w-5
                                                                    h-5
                                                                    ml-2
                                                                    text-gray-400"
                                                                />
                                                            </div>
                                                        </a>

                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div
                                                className="
                                            flex 
                                            items-center 
                                            justify-center
                                            h-64">
                                                <p className="
                                            text-zinc-400
                                            ">
                                                    Nenhum serviço em andamento
                                                </p>
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                            </>
                        )}
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

                                <form
                                    onSubmit={handleSubmit(handleIssueOrderService)}
                                    className="flex flex-col"
                                >
                                    <p className="text-green-500 text-sm">
                                        {schedule !== null ? schedule.description : ""}
                                    </p>
                                    <hr className="my-2" />
                                    <div className="mt-2 gap-1 flex flex-col">

                                        <label
                                            htmlFor='value'
                                            className="
                                            text-white
                                            text-sm        
                                    ">
                                            Valor
                                        </label>

                                        <Input
                                            className="
                                            bg-zinc-800
                                            "
                                            id="value"
                                            required
                                            type='number'
                                            placeholder="Insira o valor"
                                            {...register("value")}
                                        />
                                        {formState.errors?.value && (
                                            <span className="text-red-500">
                                                {formState.errors.value.message}
                                            </span>
                                        )}
                                        <label
                                            htmlFor='description'
                                            className="
                                        text-white
                                        text-sm                            
                                    ">
                                            Descrição
                                        </label>

                                        <Input
                                            id="description"
                                            required
                                            placeholder="Trocar a vela, trocar o filtro de ar...."
                                            className="
                                        bg-zinc-800
                                    "
                                            {...register("description")}
                                        />
                                        {formState.errors?.description && (
                                            <span className="text-red-500">
                                                {formState.errors.description.message}
                                            </span>
                                        )}
                                        <label
                                            htmlFor='description'
                                            className="
                                        text-white
                                        text-sm                            
                                    ">
                                            Peças necessárias
                                        </label>

                                        <Input
                                            id="materials"
                                            placeholder="velas, filtro de ar...."
                                            className="
                                        bg-zinc-800
                                    "
                                            {...register("materials")}
                                        />
                                        {formState.errors?.materials && (
                                            <span className="text-red-500">
                                                {formState.errors.materials.message}
                                            </span>
                                        )}
                                        <label
                                            htmlFor="start_date"
                                            className="
                                        text-white
                                        text-sm
                                        ">
                                            Começo do serviço
                                        </label>
                                        <Input
                                            type="datetime-local"
                                            id="start_date"
                                            required
                                            placeholder=""
                                            className="
                                        bg-zinc-800
                                      "
                                            {...register("start_date")}
                                        />
                                        {formState.errors?.start_date && (
                                            <span className="text-red-500">
                                                {formState.errors.start_date.message}
                                            </span>
                                        )}

                                        <label
                                            htmlFor='end_date'
                                            className="
                                        text-white
                                        text-sm                            
                                    ">
                                            Previsão de término
                                        </label>

                                        <Input
                                            type="datetime-local"
                                            id="end_date"
                                            required
                                            placeholder="2025/02/26 às 11:00"
                                            className="
                                        bg-zinc-800
                                       "
                                            {...register("end_date")}
                                        />

                                        {formState.errors?.end_date && (
                                            <span className="text-red-500">
                                                {formState.errors.end_date.message}
                                            </span>
                                        )}
                                    </div>
                                    <Button className='mt-2' type="submit">
                                        <span>
                                            Enviar
                                        </span>
                                    </Button>
                                </form>
                            </div>
                        </DialogContent>
                    </div>
                </Dialog>
            </div >
        </div >
    );
};

