import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTrigger } from "./ui/dialog";
import { MapPin, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { DropDown } from "./ui/dropdown";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "./ui/radio-group";
import PlacesAutocomplete from "react-places-autocomplete";
import { useState } from "react";
import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

interface HeaderProps {
    setShowLocationUser: any
    position: (lat: number, lng: number) => void
}

export function HeaderMap({ setShowLocationUser, position }: HeaderProps) {
    const [address, setAddress] = useState("")
    const [pos, setPosition] = useState<{ lat: number, lng: number } | null>(null)
    const [button, setButton] = useState(false)


    async function HandleAddress(value: string) {
        const res = await geocodeByAddress(value)
        const latlng = await getLatLng(res[0])
        setPosition(latlng)
        if (!pos) {
            return (<div>Loading coords...</div>)
        }
        position(pos.lat, pos.lng) //latlng.lat, latlng.lng
    }

    return (
        <Dialog>
            <div className="top-12 right-28 mt-10 absolute z-[9999] flex flex-row gap-2">
                <DialogTrigger asChild>
                    <Button className="text-current p-1 text-sm" variant="secondary">
                        <MapPin /> My Position
                    </Button>
                </DialogTrigger>

                <DialogContent>

                    <div className="p-4 gap-2">
                        <DialogClose>
                            <X className="size-5" />
                        </DialogClose>

                        <DialogDescription>
                            Onde você deseja procurar uma oficina?
                        </DialogDescription>
                    </div>

                    <div className=" p-2 gap-4 flex flex-col">
                        <Button
                            type="button"
                            onClick={(() => {
                                if (button === false) {
                                    setShowLocationUser(true), setButton(true)
                                }
                                else {
                                    setShowLocationUser(false), setButton(false)
                                }
                            })}
                        >
                            <MapPin /> My Current Position
                        </Button>

                        <label htmlFor="search"></label>
                        <PlacesAutocomplete
                            value={address}
                            onChange={setAddress}
                            onSelect={HandleAddress}
                        >{({ getInputProps, suggestions, getSuggestionItemProps
                        }) => (
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center mt-6">
                                    <Search className="absolute ps-2" />
                                    <input {...getInputProps({
                                        placeholder: "Digite um endereço...",
                                        className: "block text-sm text-zinc-300 border border-emerald-800 rounded-lg bg-emerald-900 focus:ring-emerald-950 focus:border-emerald-950 p-3 ps-10 w-[303px]",
                                    })}
                                    />
                                    <div className="absolute">
                                        {suggestions.map(s => (
                                            <div className="p-2 bg-zinc-950 rounded-lg"{...getSuggestionItemProps(s)}>
                                                <span >{s.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        )}

                        </PlacesAutocomplete>
                    </div>

                </DialogContent>

                <DropDown title="Expandir Raio de Busca" className="p-2 text-sm font-medium ring-0 tracking-tight outline-none text-current bg-gradient-to-r from-zinc-900 to-emerald-900 text-zinc-50" >
                    <RadioGroup>
                        <RadioGroupItem size="xs" className="text-xs font-medium p-2 gap-1 items-stretch" value="10">
                            20 km
                            <RadioGroupIndicator />
                        </RadioGroupItem>
                    </RadioGroup>
                </DropDown>
            </div>
        </Dialog>
    )
}