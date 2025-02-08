import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { GetVehicleByIdService } from "../../services/vehicle/get-vehicle-by-id.service";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateVehicleService } from "../../services/vehicle/update-vehicle.service";

const UpdateVehicleForm = z.object({
    model: z.string().min(1, "Informe o modelo do veículo"),
    plate: z.string().min(8, "Informe a placa do veículo"),
    brand: z.string().min(1, "Informe a marca do veículo"),
    year: z.string().min(4, "Informe o ano do veículo"),
})


type updateVehicleForm = z.infer<typeof UpdateVehicleForm>


export function UpdateVehicle() {
    const { id } = useParams();

    const { data } = useQuery({
        queryKey: ["vehicle by id", id],
        queryFn: () => GetVehicleByIdService({ id }),
        enabled: !!id
    })

    const { handleSubmit, register, formState } = useForm<updateVehicleForm>({
        resolver: zodResolver(UpdateVehicleForm)
    })

    if (!data) {
        return <h1>Carregando...</h1>;
    }

    async function handleSubmitForm(data: updateVehicleForm) {
        try {
            if (!id) return
            await UpdateVehicleService({
                id: id,
                brand: data.brand,
                model: data.model,
                plate: data.plate,
                year: Number(data.year)
            })
            alert("Veículo atualizado com sucesso!") //todo make a toast
        } catch (err) {
            window.error(err)
        }
    }

    return (
        <div className="
            flex-1
            mt-10
            bg-zinc-900
            p-6
            rounded-lg
            shadow-lg
            h-auto
            w-full
               ">

            <h1 className="
                text-2xl
                font-bold
                text-white
                mb-4
               ">Atualizar Veículo
            </h1>

            <hr className="my-4 border-zinc-700" />

            <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className="
                grid 
                grid-cols-2
                gap-4
                w-auto
                ">

                <label
                    htmlFor="model"
                    className="
                    text-white
                    ">
                    Modelo
                </label>
                <input
                    id="model"
                    defaultValue={data.vehicle.model}
                    placeholder="Modelo"
                    className="
                    p-2     
                    rounded
                    bg-zinc-800
                    text-white"
                    {...register("model")}
                />
                {
                    formState.errors.model && (
                        <span
                            className="text-red-500 text-sm col-start-2">
                            {formState.errors.model.message}
                        </span>
                    )
                }
                <label
                    htmlFor="brand"
                    className="
                    text-white
                    ">
                    Marca
                </label>
                <input
                    id="brand"
                    defaultValue={data.vehicle.brand}
                    placeholder="Marca"
                    className="
                    p-2
                    rounded
                    bg-zinc-800
                    text-white"
                    {...register("brand")}
                />
                {
                    formState.errors.brand && (
                        <span
                            className="text-red-500 text-sm col-start-2">
                            {formState.errors.brand.message}
                        </span>
                    )
                }
                <label
                    htmlFor="plate"
                    className="
                    text-white
                    ">
                    Placa
                </label>
                <input
                    id="plate"
                    defaultValue={data.vehicle.plate}
                    placeholder="Placa"
                    className="
                    p-2 
                    rounded
                    bg-zinc-800
                    text-white"
                    {...register("plate")}
                />
                {formState.errors.plate && (
                    <span
                        className="text-red-500 text-sm col-start-2">
                        {formState.errors.plate.message}
                    </span>
                )}
                <label
                    htmlFor="year"
                    className="
                    text-white">
                    Ano
                </label>
                <input
                    id="year"
                    defaultValue={data.vehicle.year}
                    placeholder="Ano"
                    type="number"
                    className="
                    p-2 
                    rounded
                    bg-zinc-800 
                    text-white"
                    {...register("year")}
                />
                {formState.errors.year && (
                    <span
                        className="text-red-500 text-sm col-start-2">
                        {formState.errors.year.message}
                    </span>
                )}

                <div
                    className="
                    flex
                    justify-end
                    col-start-2
                ">
                    <Button
                        type="submit"
                        className="
                        p-2
                        rounded
                        mt-4
                        w-[260px]
                        h-[40px]
                        ">
                        Salvar Alterações
                    </Button>
                </div>
            </form>

        </div >
    );
}

