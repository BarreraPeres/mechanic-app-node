import { Pencil, PencilLineIcon } from "lucide-react"
import { GetVehiclesService } from "../services/get-vehicles.service"
import { useQuery } from "@tanstack/react-query"

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
                                bg-zinc-950
                                rounded-lg
                                w-[170px]
                                h-[270px]
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
                                        p-4
                                        ">
                                        <img
                                            className="flex rounded-md"
                                            src="https://placehold.co/300x200">
                                        </img>

                                        <span
                                            className="
                                                text-sm
                                                flex
                                                text-green-400
                                                ">
                                            Ano: {v.year}
                                        </span>


                                        <p className="font-bold">
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
                                        <p className="font-bold">
                                            Modelo:
                                        </p>

                                        <div className="
                                            flex
                                            justify-between
                                             w-full
                                        ">
                                            <p className="
                                                    text-sm
                                                    text-zinc-300
                                                ">
                                                {v.model}
                                            </p>

                                            <button
                                                className="
                                                ">
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