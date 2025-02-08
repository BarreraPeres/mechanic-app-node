import { Pencil } from "lucide-react"
import { GetVehiclesService } from "../services/vehicle/get-vehicles.service"
import { useQuery } from "@tanstack/react-query"
import CarPNG from "/car.png"

export function Cars() {
    const { data, isLoading } = useQuery({
        queryKey: ['vehicles'],
        queryFn: GetVehiclesService,
        staleTime: 1000 * 60 // 1 minute
    })
    if (isLoading) {
        return (
            <div>
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (
        <div>
            <div
                className="
                text-lg
                font-bold
            ">Meus Carros</div>
            <main
                className="
                flex 
                flex-col
                mt-10 mb-10
                ">
                <div className="
                    flex
                    gap-3
                    h-auto
                    w-auto
                    rounded-lg">
                    {
                        data?.vehicles.map((v) => {
                            return (
                                <div
                                    className="
                                shadow-md
                                shadow-zinc-900
                                hover:shadow-lg
                                transition 
                                duration-300
                                bg-zinc-950
                                rounded-lg
                                w-[230px]
                                h-auto
                                 flex
                                 flex-col
                                ">
                                    <div
                                        className="
                                        gap-1
                                        flex
                                        flex-col
                                        items-start
                                        justify-start
                                        p-6
                                        ">

                                        <img
                                            className="flex rounded-md object-cover mb-4"
                                            src={CarPNG} />

                                        <p className="font-bold text-green-500">
                                            Marca:
                                        </p>

                                        <span
                                            className="
                                        text-zinc-300
                                        flex
                                        text-sm
                                        ">
                                            {v.brand}
                                        </span>

                                        <p className="font-bold text-green-500">
                                            Ano:
                                        </p>

                                        <span
                                            className="
                                        text-zinc-300
                                        flex
                                        text-sm
                                        ">
                                            {v.year}
                                        </span>

                                        <p className="font-bold text-green-500">
                                            Placa:
                                        </p>

                                        <span
                                            className="
                                        text-zinc-300
                                        flex
                                        text-sm
                                        ">
                                            {v.plate}
                                        </span>
                                        <p className="font-bold text-green-500">
                                            Modelo:
                                        </p>

                                        <div className="
                                            flex
                                            justify-between
                                             w-full
                                        ">
                                            <span className="
                                                text-sm
                                                flex
                                                text-zinc-300
                                                ">
                                                {v.model}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    window.location.href = `/car/${v.id}/update`
                                                }
                                            >
                                                <Pencil
                                                    size={15}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </main>
        </div>
    )

}