import { CalendarCog, Car, Home, LogOut } from "lucide-react";
import { makeLogout } from "../services/user/make-logout.service";

interface SidebarProps {
    isMechanic: boolean
}

export function Sidebar({ isMechanic }: SidebarProps) {

    async function handleLogout() {
        await makeLogout()
        window.location.href = "/"
    }

    return (
        <aside className="flex w-64 p-6">

            <nav className="flex flex-col text-zinc-300 text-sm font-semibold">

                <a className="p-4 gap-2 flex items-center hover:text-zinc-500" href="/home">
                    <Home />
                    Início
                </a>

                {isMechanic && (
                    <a className="p-4 gap-2 flex items-center hover:text-zinc-500" href="/dashboard">
                        <CalendarCog />
                        Minha Oficina
                    </a>
                )}

                <a className="p-4 gap-2 flex items-center hover:text-zinc-500" href="/appointments">
                    <CalendarCog />
                    Agendamentos
                </a>

                <a className="p-4 gap-2 flex items-center hover:text-zinc-500" href="/cars">
                    <Car />
                    Carros
                </a>

                <a className="p-4 gap-2 flex items-center hover:text-zinc-500" onClick={() => handleLogout()}>
                    <LogOut />
                    Sair
                </a>

            </nav>

        </aside>
    )
}