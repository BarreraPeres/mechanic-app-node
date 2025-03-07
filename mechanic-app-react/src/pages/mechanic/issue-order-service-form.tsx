import { useForm } from "react-hook-form"
import { Schedule } from "../../services/schedule/fetch-scheduling-history.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

interface IssueOrderServiceFormProps {
    schedule: Schedule
    onSubmit: (data: IssueOrderServiceFormData) => Promise<void>
}

const issueOrderServiceForm = z.object({
    schedule_id: z.string().optional(),
    description: z.string().min(1, 'Campo obrigatório'),
    materials: z.string().optional(),
    value: z.coerce.number().min(1, "Campo obrigatório"),
    start_date: z.coerce.date(),
    end_date: z.coerce.date()
})

export type IssueOrderServiceFormData = z.infer<typeof issueOrderServiceForm>

export function IssueOrderServiceForm({ schedule, onSubmit }: IssueOrderServiceFormProps) {

    const { handleSubmit, register, formState } = useForm<IssueOrderServiceFormData>({
        resolver: zodResolver(issueOrderServiceForm)
    })

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col"
            >
                <p className="text-green-500 text-sm">
                    {schedule !== null ? schedule.description : ""}
                </p>
                <span
                    className="flex items-center gap-2"
                >

                    <p
                        className="text-green-500 text-sm"
                    >
                        {schedule.vehicle?.model}
                    </p>
                    <p
                        className="text-green-500 text-sm">
                        {schedule.vehicle?.year}
                    </p>
                </span>
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
        </>)


}