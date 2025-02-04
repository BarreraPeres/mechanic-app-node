import { CalendarCog, Car, Home, LogOut } from "lucide-react";

export function Sidebar() {
    return (
        <aside className="flex w-64 p-6">

            <nav className="flex flex-col text-zinc-300 text-sm font-semibold">

                <a className="p-4 gap-2 flex items-center hover:text-zinc-500" href="">
                    <Home />
                    Início
                </a>

                <a className="p-4 gap-2 flex items-center hover:text-zinc-500" href="/appointments">
                    <CalendarCog />
                    Agendamentos
                </a>

                <a className="p-4 gap-2 flex items-center hover:text-zinc-500" href="">
                    <Car />
                    Carros
                </a>

                <a className="p-4 gap-2 flex items-center hover:text-zinc-500" href="">
                    <LogOut />
                    Sair
                </a>

            </nav>

        </aside>
    )
}