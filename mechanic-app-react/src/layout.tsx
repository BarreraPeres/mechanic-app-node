import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { Outlet } from "react-router-dom";


export function Layout() {
    return (
        <div className=" flex flex-col">
            <Header />
            <div className=" flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}