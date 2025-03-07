import { Calendar, ChevronRight, Clock } from "lucide-react"
import { OrderService } from "../../services/order-services/fetch-order-service.service.js"
import dayjs from "dayjs"
import { renderStatus } from "../../utils/renderStatus.js"

interface OrdersServiceProps {
    orderServices: OrderService[]
}

export function OrdersService({ orderServices }: OrdersServiceProps) {

    return (
        <div >
            {orderServices.length > 0 ? (
                orderServices?.map((os) => (
                    <div
                        key={os.id}
                        className="
                                flex 
                                w-full
                                justify-between
                                items-center
                                md:flex-row
                                md:items-center
                                md:justify-between
                                md:gap-1
                            ">
                        <div className="w-full flex-col flex">
                            <header className="flex justify-between">
                                <div className="flex flex-col ">
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
                                        Descrição: {os.description}
                                    </p>
                                    <p className="
                                        text-green-600
                                    ">
                                        R$ {os.value}
                                    </p>
                                </div>

                                <a
                                    href={`/dashboard/${os.id}`}
                                >
                                    <div className="
                                            flex
                                            items-center
                                            ">
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
                            </header>
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
                                    Começa { }
                                    {dayjs(os.start_date.toString())
                                        .format("dddd, D MMMM, HH:mm")}
                                </span>
                                <Clock
                                    className="w-4 h-4 ml-4 mr-2" />
                                <span>
                                    Previsão de Término { }
                                    {dayjs(os.end_date.toString())
                                        .format("dddd, D MMMM, HH:mm")}
                                </span>
                            </div>
                            <p className="mt-2 text-gray-700">
                                {os.materials}
                            </p>
                            <hr className="my-2" />
                        </div>

                    </div>
                ))
            ) : (
                <div
                    className="
                        flex 
                        items-center 
                        justify-center
                        h-64
                    ">
                    <p className="
                            text-zinc-400
                        ">
                        Nenhum serviço em andamento
                    </p>
                </div>
            )}
        </div>
    )
}