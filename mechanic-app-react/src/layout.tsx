import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { Outlet } from "react-router-dom";
import { getMeProfileService } from "./services/user/get-me-profile.service";
import { useQuery } from "@tanstack/react-query";


export function Layout() {

    const { data: me } = useQuery({
        queryKey: ["me"],
        staleTime: 1000 * 60 * 60 * 24,
        queryFn: () => getMeProfileService()
    })

    const isMechanic = me?.user.role === "EMPLOYEE" || me?.user.role === "BOSS"

    return (
        <div className=" flex flex-col">
            <Header />
            <div className=" flex">
                <Sidebar isMechanic={isMechanic} />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}