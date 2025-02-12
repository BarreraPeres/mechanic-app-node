import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { LocationUser } from "../lib/location-user.leaflet";
import { CalendarClock, CalendarSearch, PhoneCall, Send } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { Mechanic } from "../services/search-mechanics.service";
import { Button } from "./ui/button";
import { DialogTrigger, Dialog, DialogContent } from "./ui/dialog";
import { useState } from "react";
import { CreateSchedule } from "./schedule/create-schedule";
import { GetMechanicsNearbyService } from "../services/get-mechanics-nearby.service";
import { HeaderMap } from "./header-map";
import { MechanicCard } from "./mechanic/mechanic-card";
import { Popover } from "flowbite-react";

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
            <div className="
                h-screen
                overflow-hidden
                flex 
                flex-1
                items-center 
                justify-center
               ">

                <HeaderMap
                    setShowLocationUser={setShowLocationUser}
                    position={HandleCurrentLocation}
                />

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
                        <LocationUser
                            location={HandleCurrentLocation}
                            position={position!}
                        />
                    }

                    {position &&
                        <LocationUser
                            location={HandleCurrentLocation}
                            position={position}
                        />
                    }

                    {
                        nearbyMechanics.mechanics.map((m) => {
                            const positionOfMechanic = { lat: m.latitude, lng: m.longitude }
                            return (
                                <Marker key={m.id} position={positionOfMechanic}>
                                    <Popup maxWidth={165} maxHeight={310}>
                                        <div id="mechanic_card"
                                            className="
                                            flex
                                            h-auto
                                            flex-col
                                            overscroll-none
                                            w-auto
                                            ">
                                            <MechanicCard
                                                positionOfUser={position}
                                                key={m.id}
                                                mechanic={m}>
                                            </MechanicCard>
                                            <div className="
                                            flex 
                                            items-center 
                                            justify-between 
                                            gap-1
                                             mt-1">

                                                <DialogTrigger asChild>
                                                    <Button className="
                                                            flex 
                                                            items-center
                                                            bg-green-900
                                                            rounded-xl p-1
                                                            hover:bg-emerald-800"
                                                        onClick={() => setSelectedMechanic(m)}
                                                    >
                                                        <CalendarSearch />
                                                    </Button>
                                                </DialogTrigger>
                                                <Button
                                                    className="
                                                    flex 
                                                    items-center
                                                    bg-green-900
                                                    rounded-xl 
                                                    p-1
                                                    hover:bg-emerald-800
                                                   ">
                                                    <Popover
                                                        content={
                                                            <div
                                                                className="
                                                            flex
                                                            bg-white
                                                            w-40
                                                            h-10
                                                            text-zinc-900
                                                            font-semibold
                                                            items-center
                                                            "
                                                            >
                                                                Ver Horários Dísponivéis Hoje
                                                                <Button
                                                                    onClick={() => {
                                                                        window.location.href = `/mechanic/${m.id}`
                                                                    }}
                                                                    className="
                                                                        size-8
                                                                    ">
                                                                    <Send
                                                                        className="absolute"
                                                                        size={19}
                                                                    />

                                                                </Button>
                                                            </div>
                                                        }
                                                    >
                                                        <CalendarClock />
                                                    </Popover>
                                                </Button>

                                                <Button

                                                    className="
                                                    flex
                                                    items-center
                                                    bg-green-900
                                                    rounded-xl 
                                                    p-1
                                                    hover:bg-emerald-800
                                                    "
                                                    onClick={() => {
                                                        window.open(`https://wa.me/${m.phone}`)
                                                    }}>
                                                    <PhoneCall />
                                                </Button>
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
