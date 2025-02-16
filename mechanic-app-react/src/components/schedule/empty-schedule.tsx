import { Button } from "../ui/button";

export function EmptySchedule() {
    return (
        <div className="flex flex-col items-center justify-center mt-10 ml-[300px] gap-4 overflow-hidden">
            <h1 className="text-2xl font-bold text-zinc-300">
                Não há agendamentos
            </h1>
            <p className="text-zinc-300">
                Clique no botão abaixo para agendar um novo serviço
            </p>
            <Button
                onClick={() => {
                    window.location.href = "/home"
                }}
                className="px-10 py-4 text-xl"
            > Agendar </Button>

        </div>
    )
}