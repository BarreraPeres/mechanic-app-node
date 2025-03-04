import { X } from 'lucide-react';
import { Mechanic } from "../../services/mechanic/search-mechanics.service";
import { Button } from "../ui/button";
import { DialogTitle } from "../ui/dialog";
import { Datepicker } from "flowbite-react";
import { datepickerTheme } from "../styles/datapicker";
import { TimePicker } from "../ui/timepicker";
import { DialogClose } from '@radix-ui/react-dialog';
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateScheduleService } from "../../services/schedule/create-schedule.service";
import dayjs from "dayjs";
import { Input } from "../ui/input";
import { DropDown } from "../ui/dropdown";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "../ui/radio-group";
import { useQuery } from '@tanstack/react-query';
import { GetVehiclesService } from '../../services/vehicle/get-vehicles.service';
import { Skeleton } from '../ui/skeleton';

const yesterday = dayjs().add(-1, "day").toDate()

const createScheduleForm = z.object({
    scheduled_for: z.date().min(yesterday, { message: `Insira uma data válida` }), //.max(new Date("1900-01-01"), { message: "Informe a data desejada" }),
    time: z.string().min(1, { message: "Informe o horário desejado" }),
    description: z.string().min(1, "Informe a descrição"),
    vehicle_id: z.string(),
    type: z.string().min(1, "Informe o tipo do serviço"),
})

type CreateScheduleForm = z.infer<typeof createScheduleForm>

interface CreateScheduleProps {
    mechanic_id: Mechanic | null
}

export function CreateSchedule({ mechanic_id }: CreateScheduleProps) {

    const { handleSubmit, control, register, reset, formState } = useForm<CreateScheduleForm>({
        resolver: zodResolver(createScheduleForm)
    })

    const { data: Vehicles, isLoading } = useQuery({
        queryKey: ["get vehicles"],
        queryFn: () => GetVehiclesService(),
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })


    async function HandleCreateScheduling(data: CreateScheduleForm) {
        if (!mechanic_id) return

        try {
            let schedule_for = dayjs(data.scheduled_for)
            const segunds = parseInt(data.time.split(':')[1])
            const minutes = parseInt(data.time)
            schedule_for = schedule_for.add(segunds, "seconds").add(minutes, "minute")
            const datas = schedule_for.toDate();

            await CreateScheduleService({
                scheduled_for: datas,
                description: data.description,
                mechanic_id: mechanic_id.id,
                type: data.type,
                vehicle_id: data.vehicle_id
            })

            alert("Solicitação de agendamento enviada!")

            reset()
        } catch (err) {
            window.error(err)
        } finally {
            reset()
        }
    }

    if (!Vehicles || !Vehicles.vehicles || isLoading) {
        return (<Skeleton />)
    }

    return (
        <div>
            <DialogClose>
                <X className="size-5" />
            </DialogClose>
            <form onSubmit={handleSubmit(HandleCreateScheduling)}>
                <div className="flex items-center">
                    <div>
                        <DialogTitle> Escolha o dia desejado
                        </DialogTitle>
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
                        {
                            formState.errors.scheduled_for && (
                                <p className="text-red-500 text-sm">{formState.errors.scheduled_for.message}</p>
                            )
                        }
                        <DialogTitle>
                            Escolha a hora desejada
                        </DialogTitle>
                        <label htmlFor="time"></label>
                        <Controller
                            control={control}
                            name="time"
                            defaultValue="12:00"
                            render={({ field }) => {
                                return (
                                    <TimePicker
                                        onTimeChange={field.onChange}
                                    />
                                )
                            }}
                        />
                        <DialogTitle>
                            Dê uma breve descrição
                        </DialogTitle>
                        <label htmlFor="description"></label>
                        <Input
                            id="description"
                            placeholder="Troca de óleo"
                            {...register("description")}
                        />
                        {formState.errors.description && (
                            <p className="pl-5 pt-2 text-red-400 text-sm">{formState.errors.description.message}</p>
                        )}
                        <div className="flex items-center">
                            <div className="flex flex-wrap -mt-24">
                                <DialogTitle >
                                    Escolha seu carro
                                </DialogTitle>
                                <label htmlFor="vehicle_id"></label>
                                <Controller
                                    control={control}
                                    name="vehicle_id"
                                    render={({ field }) => {
                                        return (
                                            <DropDown title="Carros">
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                >
                                                    {Vehicles.vehicles.map((v) => {
                                                        return (
                                                            <RadioGroupItem
                                                                size="sm"
                                                                value={v.id}>
                                                                <RadioGroupIndicator />
                                                                <span>{v.model}/{v.plate}</span>
                                                            </RadioGroupItem>
                                                        )
                                                    })}


                                                </RadioGroup>
                                            </DropDown>
                                        )
                                    }}
                                />
                                {formState.errors.vehicle_id && (
                                    <p className="p-1 text-red-400 text-sm">{formState.errors.vehicle_id.message}</p>
                                )}
                            </div>
                            <div>
                                <DialogTitle>
                                    Escolha o tipo do serviço
                                </DialogTitle>
                                <label htmlFor="type"></label>
                                <Controller
                                    control={control}
                                    name="type"
                                    render={({ field }) => {
                                        return (
                                            <RadioGroup onValueChange={field.onChange}>
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
                                    <p className="pl-5 pt-2 text-red-400 text-sm">{formState.errors.type.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-row-reverse mt-5">
                            <Button type="submit" > Agendar Serviço</Button>
                        </div>
                    </div>
                </div>
            </form>


        </div>

    )

}