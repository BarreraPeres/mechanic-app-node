import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Breadcrumb } from "flowbite-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterMechanicService } from "../../services/mechanic/register-mechanic.service";
import { getLatLng } from "../../utils/getLatLng";

interface SearchAdressByCepServiceResponse {
    bairro: string
    cep: string
    cidade: string
    complemento: string
    ddd: string
    estado: string
    gia: string
    ibge: string
    localidade: string
    logradouro: string
    regiao: string
    siafi: string
    uf: string
    unidade: string
}

async function SearchAdressByCepService(cep: string): Promise<SearchAdressByCepServiceResponse> {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    return res.json()
}

function AutoComplete(address: SearchAdressByCepServiceResponse) {
    const street = document.querySelector("#street") as HTMLInputElement
    const city = document.querySelector("#city") as HTMLInputElement
    const neighborhood = document.querySelector("#neighborhood") as HTMLInputElement
    const state = document.querySelector("#state") as HTMLInputElement
    street.value = address.logradouro
    city.value = address.localidade
    neighborhood.value = address.bairro
    state.value = address.estado
}

const registerMechanicForm = z.object({
    name: z.string(),
    phone: z.string(),
    cep: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    state: z.string(),
    city: z.string(),
    number: z.coerce.number()
})
type RegiterMechanicForm = z.infer<typeof registerMechanicForm>


export function RegisterMechanic() {
    const [cep, setCep] = useState("")
    const [address, setAddress] = useState<any>("")

    useEffect(() => {
        if (cep.length === 8) {
            try {
                const fetch = async () => {
                    const res = await SearchAdressByCepService(cep)
                    setAddress(res)
                }
                fetch()
            } catch (error) {
                window.error(error)
            }
        }
    }, [cep])
    if (address) {
        AutoComplete(address)
    }


    const { handleSubmit, register } = useForm<RegiterMechanicForm>({
        resolver: zodResolver(registerMechanicForm)
    })

    async function HandleRegiserMechanic({ name, phone, street, neighborhood, number, city, state }: RegiterMechanicForm) {
        try {
            const b = document.getElementById("submit") as HTMLFormElement
            b.style.display = "none"

            if (!street || !neighborhood || !city) {
                const street = document.querySelector("#street") as HTMLInputElement
                const neighborhood = document.querySelector("#neighborhood") as HTMLInputElement
                const city = document.querySelector("#city") as HTMLInputElement
                const state = document.querySelector("#state") as HTMLInputElement

                const { lat, lng } = await getLatLng(street.value, neighborhood.value, number, city.value, state.value)
                const res = await RegisterMechanicService({ latitude: lat, longitude: lng, name, phone })
                window.location.href = `dashboard?=${res?.mechanic.id}`
            } else {
                const { lat, lng } = await getLatLng(street, neighborhood, number, city, state)
                const res = await RegisterMechanicService({ latitude: lat, longitude: lng, name, phone })
                window.location.href = `dashboard?=${res?.mechanic.id}`
            }
        } catch (e) {
            window.error(e)
            alert("Erro ao registrar sua mecanica")
            window.location.href = "/"
        }

    }

    return (
        <div className="
            items-center
            my-14
            justify-center
            flex
            flex-col
            space-y-4
        ">
            <nav
                className="
                flex
                -ml-52
            ">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">
                            Agendão
                        </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/questions">
                            Perguntas
                        </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/register-mechanic">
                            Registrar Oficina
                        </a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </nav>
            <div className="
            flex
            flex-col
            items-start
            -ml-52
            mb-4
            ">
                <p className="
                    text-3xl
                    font-bold
                    leading-tight
                    justify-start    
            ">Estamos Quase Lá</p>
                <p className="
                    text-xl
                    items-start
                    font-bold
                    leading-tight
                    justify-start
                    bg-gradient-to-r 
                    from-green-600
                    via-green-500
                    to-green-900
                    inline-block 
                    text-transparent
                    bg-clip-text
         ">
                    Cadastre Sua Oficina Mecânica
                </p>
            </div>
            <form
                onSubmit={handleSubmit(HandleRegiserMechanic)}
                id="form"
                className="
                w-[500px]
                space-y-2
            ">
                <div className="mt-2">
                    <label htmlFor="name">Nome de sua oficna mecânica</label>
                    <Input
                        id="name"
                        type="text"
                        autoComplete="off"
                        placeholder="Nome tal do tal"
                        required
                        {...register("name")}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Telefone</label>
                    <Input
                        id="phone"
                        type="number"
                        placeholder="o telefone que será usado para contato"
                        required
                        {...register("phone")}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="cep">Cep</label>
                        <Input
                            id="cep"
                            type="text"
                            placeholder="insira o cep de sua oficina"
                            required
                            {...register("cep")}
                            onChange={(e) => {
                                setCep(e?.target?.value.replace(/-/g, ""))
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="street">Rua</label>
                        <Input
                            id="street"
                            type="text"
                            placeholder="Rua da sua oficina"
                            autoComplete="street-address"
                            required
                            {...register("street")}
                        />
                    </div>
                    <div>
                        <label htmlFor="neighborhood">Bairro</label>
                        <Input
                            id="neighborhood"
                            type="text"
                            placeholder="Bairro referente sua oficina"
                            required
                            {...register("neighborhood")}
                        />
                    </div>
                    <div>
                        <label htmlFor="state">Estado</label>

                        <Input
                            id="state"
                            type="text"
                            autoComplete="address-level1"
                            placeholder="Estado referente sua oficina"
                            required
                            {...register("state")}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">Cidade</label>
                        <Input
                            id="city"
                            type="text"
                            autoComplete="address-level2"
                            placeholder="Cidade referente sua oficina"
                            required
                            {...register("city")}
                        />
                    </div>
                    <div>
                        <label htmlFor="number">Número</label>
                        <Input
                            id="number"
                            type="number"
                            autoComplete="address-level3"
                            placeholder="Número referente sua oficina"
                            required
                            {...register("number")}
                        />
                    </div>
                </div>
                <div className="
                    pt-2
                    flex
                    items-end
                    justify-end
                ">
                    <Button
                        id="submit"
                        type="submit"
                        className="
                        px-6                                
                    ">
                        Registrar
                    </Button>
                </div>
            </form>
        </div >
    )
}