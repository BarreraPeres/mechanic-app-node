import { Button } from "../ui/button";
import { Datepicker } from "flowbite-react";
import { datepickerTheme } from "../styles/datapicker";
import { TimePicker } from "../ui/timepicker";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateScheduleService } from "../../services/create-schedule.service";
import dayjs from "dayjs";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "../ui/radio-group";
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetVehiclesService } from "../../services/vehicle/get-vehicles.service";
import { Skeleton } from "../ui/skeleton";

const createScheduleForm = z.object({
    scheduled_for: z.date(),
    time: z.string(),
    description: z.string().min(1, "Informe a descrição"),
    vehicle_id: z.string(),
    type: z.string().min(1, "Informe o tipo do serviço"),
})

type RegisterScheduleForm = z.infer<typeof createScheduleForm>


export function RegisterSchedule() {
    const queryClient = useQueryClient()

    const parms = useParams()
    if (!parms.id) { return <div>Loading...</div> }
    const [id, time] = parms.id.split("&")

    const { data: Vehicles, isLoading } = useQuery({
        queryKey: ["get vehicles"],
        queryFn: () => GetVehiclesService(),
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })

    const { handleSubmit, control, register, reset, formState } = useForm<RegisterScheduleForm>({
        resolver: zodResolver(createScheduleForm)
    })


    async function HandleCreateScheduling(data: RegisterScheduleForm) {
        try {
            let schedule_for = dayjs(data.scheduled_for)
            const segunds = parseInt(data.time.split(':')[1])
            const minutes = parseInt(data.time)
            schedule_for = schedule_for.add(segunds, "seconds").add(minutes, "minute")
            const datas = schedule_for.toDate();

            await CreateScheduleService({
                scheduled_for: datas,
                description: data.description,
                mechanic_id: id,
                type: data.type,
                vehicle_id: data.vehicle_id
            })
            queryClient.invalidateQueries({ queryKey: ["get schedules by mechanic id"] })
            queryClient.invalidateQueries({ queryKey: ["get get times by mechanic id"] })

            alert("Solicitação de agendamento enviada!")

        } catch (error) {
            window.error(error)
            alert("Erro Ao Criar Agendamento")
        } finally {
            reset()
            window.location.href = "/schedules"
        }
    }

    if (!Vehicles || !Vehicles.vehicles || isLoading) {
        return (<Skeleton />)
    }

    return (
        <div>
            <form
                className="
            w-full
            "
                onSubmit={handleSubmit(HandleCreateScheduling)}>
                <div className="
                        grid 
                        grid-cols-2
                        items-center 
                        p-2
                        gap-4
                ">
                    <div
                        className="
                        flex
                        flex-col
                        gap-2
                    ">
                        <strong>
                            Escolha o dia desejado
                        </strong>
                        <label htmlFor="scheduled_for"></label>
                        <Controller
                            control={control}
                            name="scheduled_for"
                            defaultValue={new Date()}
                            render={({ field }) => {
                                return (
                                    <Datepicker
                                        theme={datepickerTheme}
                                        language="pt-BR"
                                        labelTodayButton="Hoje"
                                        labelClearButton="Limpar"
                                        onChange={field.onChange}
                                    />
                                )
                            }}
                        />
                        <strong>
                            Escolha a hora desejada
                        </strong>
                        <label htmlFor="time"></label>
                        <Controller
                            control={control}
                            name="time"
                            defaultValue={time || "00:00"}
                            render={({ field }) => {
                                return (
                                    <TimePicker
                                        className="w-full"
                                        initialTime={time || "00:00"}
                                        onTimeChange={field.onChange}
                                    />
                                )
                            }}
                        />

                        <strong>
                            Dê uma descrição
                        </strong>
                        <label htmlFor="description"></label>
                        <Input
                            id="description"
                            placeholder="Troca de óleo"
                            {...register("description")}
                        />
                        {formState.errors.description && (
                            <p
                                className="
                                pl-5
                                pt-2
                                text-red-400
                                text-sm
                            ">
                                {formState.errors.description.message}
                            </p>
                        )}
                        <div
                            className="flex"
                        >
                            <div
                                className="
                                flex 
                                flex-col
                                flex-1 
                                p-2
                            ">
                                <strong>
                                    Escolha seu carro
                                </strong>
                                <label htmlFor="vehicle_id"></label>
                                <Controller
                                    control={control}
                                    name="vehicle_id"
                                    render={({ field }) => {
                                        return (
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                {Vehicles.vehicles.map((v) => {
                                                    return (

                                                        <RadioGroupItem
                                                            size="sm"
                                                            value={v.id}>
                                                            <RadioGroupIndicator />
                                                            <span>{v.plate} {v.model}</span>
                                                        </RadioGroupItem>
                                                    )
                                                })}

                                            </RadioGroup>
                                        )
                                    }}
                                />
                                {formState.errors.vehicle_id && (
                                    <p className="
                                        p-1
                                        text-red-400
                                        text-sm
                                      ">
                                        {formState.errors.vehicle_id.message}
                                    </p>
                                )}
                            </div>
                            <div
                                className="
                                flex
                                flex-col
                                p-2
                                flex-1
                            ">
                                <strong>
                                    Escolha o tipo do serviço
                                </strong>
                                <label htmlFor="type"></label>
                                <Controller
                                    control={control}
                                    name="type"
                                    render={({ field }) => {
                                        return (
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <RadioGroupItem
                                                    size="sm"
                                                    value="MAINTENANCE">
                                                    <RadioGroupIndicator />
                                                    <span>Manutenção</span>
                                                </RadioGroupItem>

                                                <RadioGroupItem
                                                    size="sm"
                                                    value="REPAIR">
                                                    <RadioGroupIndicator />
                                                    <span>Reparo</span>
                                                </RadioGroupItem>

                                                <RadioGroupItem
                                                    size="sm"
                                                    value="INSPECTION">
                                                    <RadioGroupIndicator />
                                                    <span>Inspeção</span>
                                                </RadioGroupItem>
                                            </RadioGroup>
                                        )
                                    }}
                                />
                                {formState.errors.type && (
                                    <p
                                        className="
                                        pl-5
                                        pt-2
                                        text-red-400
                                        text-sm
                                    ">
                                        {formState.errors.type.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div
                            className="
                            flex 
                            flex-row-reverse 
                            mt-5
                        ">
                            <Button
                                type="submit"
                            >
                                Agendar Serviço
                            </Button>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}