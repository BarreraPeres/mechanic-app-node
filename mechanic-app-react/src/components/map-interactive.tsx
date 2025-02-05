import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { LocationUser } from "../lib/location-user.leaflet";
import { CalendarClock, CalendarSearch, MessageSquareText } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { Mechanic } from "../services/search-mechanics.service";
import { Button } from "./ui/button";
import { DialogTrigger, Dialog, DialogContent } from "./ui/dialog";
import { useState } from "react";
import { CreateSchedule } from "./create-schedule";
import { GetMechanicsNearbyService } from "../services/get-mechanics-nearby.service";
import { HeaderMap } from "./header-map";

export function MapInteractive() {
    const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null)
    const [position, setPosition] = useState<{ lat: number, lng: number } | null>(null)
    const [showLocationUser, setShowLocationUser] = useState(false)

    if (!position) {
        navigator.geolocation.getCurrentPosition(position => {
            setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
        })
    }

    function HandleCurrentLocation(lat: number, lng: number) {
        setPosition({ lat, lng })
    }

    const { data: nearbyMechanics } = useQuery({
        queryKey: ["get nearby mechanics"],
        queryFn: () => GetMechanicsNearbyService({ latitude: position!.lat, longitude: position!.lng }),
        staleTime: 1000 * 60 * 60 * 24, // 24 horas
        enabled: !!position
    })

    if (!nearbyMechanics) {
        return (<div>Loading...</div>)
    }

    return (
        <Dialog>
            <div className="h-screen overflow-hidden flex flex-1 items-center justify-center">

                <HeaderMap setShowLocationUser={setShowLocationUser} position={HandleCurrentLocation} />

                <MapContainer
                    center={[-23.2928764, -45.9413343]} // coords iniciais brasilian
                    zoom={20}
                    scrollWheelZoom={true}
                    style={{ height: '80vh', width: '80%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {showLocationUser &&
                        <LocationUser location={HandleCurrentLocation} position={position!} />
                    }

                    {position &&
                        <LocationUser location={HandleCurrentLocation} position={position} />
                    }

                    {
                        nearbyMechanics.mechanics.map((m) => {
                            const position = { lat: m.latitude, lng: m.longitude }
                            return (
                                <Marker key={m.id} position={position}>
                                    <Popup maxWidth={165} maxHeight={310}>
                                        <div id="mechanic_card" className="flex flex-col w-full overscroll-none">
                                            <img className="rounded-2xl flex relative shadow-lg shadow-yellow-300 " src="https://via.placeholder.com/600x400" />
                                            <img className="w-16 h-16 my-16 absolute  rounded-full shadow-lg shadow-yellow-300" src="https://via.placeholder.com/64" />
                                            <div className="text-xs mt-10">
                                                <div className="flex flex-col gap-0.5">
                                                    <h2 className="text-sm text-zinc-800 font-semibold ">{m.name} </h2>
                                                    <span className="text-zinc-600 text-sm ">Endereço: {m.latitude} </span>
                                                    <span className="text-zinc-600 text-sm ">Telefone: {m.phone}</span>
                                                </div>
                                                <div className="flex items-center justify-between gap-1 mt-2">

                                                    <DialogTrigger asChild>
                                                        <Button className="flex items-center bg-yellow-900 rounded-xl p-1 hover:bg-emerald-800"
                                                            onClick={() => setSelectedMechanic(m)}
                                                        >
                                                            <CalendarSearch />
                                                        </Button>
                                                    </DialogTrigger>

                                                    <a className="flex items-center bg-yellow-500 rounded-xl p-1 hover:bg-emerald-800"><CalendarClock /></a>
                                                    <a className="flex items-center bg-yellow-500 rounded-xl p-1 hover:bg-emerald-800" href="http://localhost:4000/"> <MessageSquareText /> </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </MapContainer>

                <DialogContent>
                    <CreateSchedule mechanic_id={selectedMechanic} />
                </DialogContent>
            </div >
        </Dialog >
    )
}

// const locationMechanics = new L.Icon({
//     iconUrl: "here a personalizate after",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [0, -41]
// })

//                 <Star /> <Star /> <Star /> <Star /> <Star />
