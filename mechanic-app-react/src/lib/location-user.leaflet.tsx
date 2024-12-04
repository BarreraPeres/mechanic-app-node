
import { useEffect, useState } from "react"
import { useMap, Marker, Popup } from "react-leaflet"


export interface LocationUserProps {
    location: (latitude: number, longitude: number) => void
    position: ({ lat: number, lng: number })
}

export function LocationUser({ location, position }: LocationUserProps) {
    const [pos, setPosition] = useState<[number, number] | null>(null)
    const map = useMap()

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition([e.latlng.lat, e.latlng.lng])
            location(e.latlng.lat, e.latlng.lng)
            setPosition([position.lat, position.lng])
            map.flyTo(e.latlng, map.getZoom())
        })

    }, [])
    return map.flyTo(position, 15) ? (
        <Marker position={position!} >
            <Popup>You are here </Popup>
        </Marker>
    ) : (
        <Marker position={pos!} >
            <Popup>You are here </Popup>
        </Marker>
    )


}
