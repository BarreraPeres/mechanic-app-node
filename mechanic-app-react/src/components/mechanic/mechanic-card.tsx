export interface MechanicProps {
    name: string;
    phone: string;
    address: string;
    distance: string;
    imageUrl: string;
    latitude: number; // Coordenadas da oficina
    longitude: number;
}

export function MechanicCard({ address, distance, imageUrl, name, phone }: MechanicProps) {
    return (
        <div className='h-screen flex flex-col items-center justify-center gap-4'>
            <div className='max-w-[240px] p-2 shadow-yellow-500 overflow-hidden rounded-md shadow-[0_2px_10px]'>
                <div className="pt-0">
                    <img
                        className="block object-cover w-full h-[140px] bg-gray-100" src={imageUrl}
                    />

                    <p className="pt-4 text-sm">
                        <strong className="text-xl leading-relaxed">{name}</strong>
                        <p className="text-zinc-300">Telefone: {phone}</p>
                        <p className="text-zinc-300">Endereço: {address}</p>
                        <p className="text-zinc-300" >Distância: {distance}</p>
                    </p>
                </div>
            </div>
        </div >

    )
}