import { useQuery } from "@tanstack/react-query";
import { makeLogout } from "../services/user/make-logout.service";
import { Icon } from "./icon";
import { Dialog } from "./ui/dialog";
import { Dropdown } from "flowbite-react";
import { getMeProfileService } from "../services/user/get-me-profile.service";
import { Skeleton } from "./ui/skeleton";


export function Header() {
    async function handleLogout() {
        await makeLogout()
        window.location.href = "/"
    }

    const { data: me } = useQuery({
        queryKey: ["me"],
        staleTime: 1000 * 60 * 60 * 24,
        queryFn: () => getMeProfileService()
    })

    const isMechanic = me?.user.role === "EMPLOYEE" || me?.user.role === "BOSS"

    if (!me) {
        return <Skeleton></Skeleton>
    }
    return (
        <Dialog>
            <head className="flex justify-between h-20 w-full">
                <div className="p-4"> <Icon /> </div>

                <div className="p-4">

                    <Dropdown
                        theme={{
                            floating: {
                                style: {
                                    auto: " z-[99999] bg-emerald-950 text-white"
                                }
                            }

                        }}
                        arrowIcon={false}
                        inline
                        label={
                            <img
                                src="https://picsum.photos/50" alt="Minha foto"
                                className="
                                w-15
                                h-15
                                rounded-full
                                ring-2
                                hover:ring-green-500
                                border
                                border-zinc-900
                                ring-zinc-900
                          "/>
                        }
                    >
                        <Dropdown.Header

                        >
                            <span
                                className="
                                block 
                                text-sm
                                text-white
                             ">
                                {me.user.name}
                            </span>
                            <span className="
                                block 
                                truncate
                                text-sm
                                font-medium
                                text-white
                               ">
                                {me.user.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item
                            onClick={() => {
                                window.location.href = "/home"
                            }}
                            className="
                            text-white
                            hover:text-green-600
                        ">
                            Home
                        </Dropdown.Item>
                        {
                            isMechanic &&
                            <Dropdown.Item
                                onClick={() => {
                                    window.location.href = "/mechanic/dashboard"
                                }}
                                className="
                                text-white
                                hover:text-green-600
                            ">
                                Dashboard
                            </Dropdown.Item>
                        }
                        <Dropdown.Item
                            onClick={() => {
                                window.location.href = "/config/me"
                            }}
                            className="
                            text-white
                            hover:text-green-600
                        ">
                            Configurações
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                window.location.href = "/config/notifications"
                            }}
                            className="
                            text-white
                            hover:text-green-600
                        ">
                            Notificações
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                window.location.href = "/pt-br/about"
                            }}
                            className="
                            text-white
                            hover:text-green-600
                         ">
                            Sobre
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                            onClick={handleLogout}
                            className="
                            text-white
                            hover:text-green-600
                         ">
                            Sair
                        </Dropdown.Item>
                    </Dropdown>



                </div>
            </head >

        </Dialog >
    )
}