import { Calendar, CalendarCog, Car, Home, LayoutDashboard, LogOut, UsersRound } from "lucide-react";
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

                {isMechanic ? (
                    <>
                        <a
                            href="/dashboard"
                            className="
                            p-4
                            gap-2
                            flex 
                            items-center 
                            hover:text-zinc-500
                        ">
                            <LayoutDashboard />
                            Dashboard
                        </a>

                        <a
                            href="/mechanic/appointments"
                            className="
                            p-4
                            gap-2
                            flex 
                            items-center
                           hover:text-zinc-500
                        ">
                            <Calendar />
                            Agendamentos
                        </a>
                        <a
                            href="/mechanic/order-services"
                            className="
                            p-4
                            gap-2
                            flex 
                            items-center
                           hover:text-zinc-500
                        ">
                            <CalendarCog />
                            Serviços
                        </a>
                        <a
                            href="/mechanic/employees"
                            className="
                            p-4
                            gap-2
                            flex 
                            items-center
                            hover:text-zinc-500

                        ">
                            <UsersRound />
                            Funcionários
                        </a>
                    </>
                ) : (
                    <>
                        <a className="p-4 gap-2 flex items-center hover:text-zinc-500" href="/home">
                            <Home />
                            Início
                        </a>
                        <a className="p-4 gap-2 flex items-center hover:text-zinc-500" href="/appointments">
                            <CalendarCog />
                            Agendamentos
                        </a>
                        <a className="p-4 gap-2 flex items-center hover:text-zinc-500" href="/cars">
                            <Car />
                            Carros
                        </a>
                    </>


                )}

                <a className="p-4 gap-2 flex items-center hover:text-zinc-500" onClick={() => handleLogout()}>
                    <LogOut />
                    Sair
                </a>

            </nav>

        </aside>
    )
}