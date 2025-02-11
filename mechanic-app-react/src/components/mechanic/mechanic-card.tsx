import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../ui/dialog"
import { MapPinPlus, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
export interface MechanicProps {
    mechanic: {
        id: string;
        name: string;
        phone: string;
        // distance: string;
        // imageUrl: string;
        latitude: number; // Coordenadas da oficina
        longitude: number;
    }
    positionOfUser: {
        lat: number;
        lng: number;
    } | null;
}
async function CalculateAdress(latitude: number, longitude: number): Promise<string> {
    const res = await axios(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_API_GEOCODING_GOOGLE_KEY}`)

    return res.data.results[0].formatted_address

}

async function getDistanceBetweenCoordinates(
    from: { latitude: number; longitude: number },
    to: { latitude: number; longitude: number }
): Promise<string> {
    if (from.latitude === to.latitude && from.longitude === to.longitude) {
        return "0"
    }

    const fromRadian = (Math.PI * from.latitude) / 180
    const toRadian = (Math.PI * to.latitude) / 180

    const theta = from.longitude - to.longitude
    const radTheta = (Math.PI * theta) / 180

    let dist =
        Math.sin(fromRadian) * Math.sin(toRadian) +
        Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

    if (dist > 1) {
        dist = 1
    }

    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344

    if (Math.min(dist).toString().split(".")[0] === "0") {
        const m = Math.min(dist).toString().split(".")[1].substring(0, 3) + "m"
        return m
    }
    return Math.min(dist).toString().substring(0, 3) + "Km"
}
export function MechanicCard({ mechanic, positionOfUser }: MechanicProps) {
    const [address, setAddress] = useState<string>("")
    const [distance, setDistance] = useState<string>("")
    const to = { latitude: mechanic.latitude, longitude: mechanic.longitude }
    if (!positionOfUser) {
        return <div>Loading...</div>
    }
    const from = { latitude: positionOfUser.lat, longitude: positionOfUser.lng }
    useEffect(() => {
        try {
            (async () => {
                CalculateAdress(mechanic.latitude, mechanic.longitude).then(address => {
                    setAddress(address)
                })
            })(),
                (async () => {
                    getDistanceBetweenCoordinates(
                        from,
                        to
                    ).then(distance => {
                        console.log("distance", distance)
                        setDistance(distance)
                    })
                })()
        } catch (error) {
            console.log(error)
            window.error(error)
        }
    }, [mechanic])

    if (!address) { return <div>Loading...</div> }
    if (!distance) { return <div>Loading...</div> }
    const street = address.split("-")[1].split(",")[0]

    return (
        <Dialog>
            <div>
                <img
                    src="https://placehold.co/400x300"
                    className="
                rounded-2xl
                flex
                relative 
                shadow-lg
                shadow-green-800
                "/>
                <img
                    className="
                w-16
                h-16
                -mt-10
                absolute  
                rounded-full
                shadow-lg
                shadow-green-900"
                    src="https://placehold.co/64"
                />
                <div
                    className="
                text-xs
                mt-8
                h-auto">
                    <div
                        className="
                    flex 
                    flex-col
                    gap-0.5
                    ">
                        <h2
                            className="
                        text-sm
                        text-zinc-800
                        font-semibold 
                      ">
                            {mechanic.name}
                        </h2>
                        <div className="flex flex-row w-full justify-between flex-1">
                            <span
                                className="
                            text-zinc-600
                            text-sm
                           ">
                                {street}
                            </span>
                            <DialogTrigger asChild>
                                <button > <Plus size={19} /> </button>
                            </DialogTrigger>
                        </div>
                        <span
                            className="
                        text-zinc-600
                        text-sm
                       ">
                            <span
                                className="
                            text-sm
                            text-zinc-800
                            font-semibold
                            ">
                                Telefone { }
                            </span>
                            {mechanic.phone}
                        </span>
                        <span
                            className="
                        text-zinc-600
                         text-sm 
                         ">
                            <span
                                className="
                            text-sm
                            text-zinc-800
                            font-semibold
                            ">
                                Distância: { }
                            </span> {distance}
                        </span>

                        <DialogContent>
                            <div
                                className="p-2">
                                <DialogClose
                                    className="
                                justify-end
                                w-full
                                flex
                                "
                                >
                                    <X className="size-5" />
                                </DialogClose>
                                <p
                                    className="
                                    font-bold
                                    text-lg
                                    mb-2
                                ">
                                    Endereço
                                </p>
                                <span>
                                    {address}
                                </span>
                                <Button
                                    onClick={() => {
                                        window.open
                                            (`https://www.google.com/maps/search/?api=1&query=${mechanic.latitude},${mechanic.longitude}`)
                                    }}
                                    className="
                                w-full
                                font-bold
                                mt-10
                                ">
                                    Como chegar?
                                    <MapPinPlus />
                                </Button>

                            </div>
                        </DialogContent>
                    </div>
                </div>
            </div >
        </Dialog>
    )
}