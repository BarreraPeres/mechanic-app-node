import { Header } from "../components/header";
import { MapInteractive } from "../components/map-interactive";
import { Sidebar } from "../components/sidebar";

export function Home() {
    return (
        <div>
            <Header />
            <main className="flex">
                <Sidebar />
                <MapInteractive />
            </main>
        </div>
    )
}