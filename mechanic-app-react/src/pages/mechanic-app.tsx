import { Button } from "../components/ui/button"
import IMG from "/car.png"
import { ArrowRight, Clock, MapPin, Star } from "lucide-react"

export function MechanicApp() {
    return (
        <div className="
            flex
            flex-col
            w-auto
            h-auto 
            mt-40
        ">
            <header className="
                    flex
                    flex-wrap
                    max-w-screen-xl
                    mx-auto
                    -mt-40
                    mb-20
                    w-full 
                    h-full 
                 p-2
                    bg-zinc-900
            ">
                <a href="/"
                    className="
                    flex
                    items-center
                    space-x-2
                    rtl:space-x-reverse
                    transition
                    transform
                    hover:scale-105
                    hover
                    ease-in-out
                ">
                    <span className="pl-4">
                        Agendão
                    </span>
                </a>
                <div className="
                    ml-auto
                    flex
                    items-center
                    space-x-4
                    md:order-2
                ">
                    <a href="/"
                        className="
                        hover:text-green-800
                        hover:underline
                    ">
                        Inicio
                    </a>
                    <a
                        href="/pt-BR/about"
                        className="
                        hover:text-green-800
                        hover:underline
                    ">
                        Sobre
                    </a>
                    <a
                        href="/pt-BR/privacy-policy"
                        className="
                        hover:text-green-800
                        hover:underline
                    ">
                        Política de Privacidade
                    </a>
                    <div className="
                        flex
                        relative
                        items-center
                        space-x-1
                        md:space-x-0
                        rtl:space-x-reverse 
                        mt-2
                        gap-2
                    ">
                        <Button
                            onClick={() => window.location.href = "/register"}
                            className="text-lg bg-zinc-900 text-green-600
                        ">
                            Criar conta
                        </Button>
                        <Button
                            onClick={() => window.location.href = "/login"}
                            className="text-lg
                             hover:bg-white
                              hover:text-zinc-900
                              ">
                            Entrar
                        </Button>
                    </div>
                </div>
            </header>
            <main>
                <section className="py-24">
                    <div
                        className="
                                grid
                                md:grid-cols-2
                                px-6
                                gap-12
                                items-center
                            ">
                        <div className="space-y-6">
                            <h1 className="
                                text-4xl
                                md:text-5xl
                                font-bold
                                leading-tight
                            ">
                                Encontre as Melhores Mecânicas Perto de Você
                            </h1>
                            <p className="
                                text-lg
                                text-zinc-300
                            ">
                                Agende serviços automotivos com os melhores profissionais da sua região de forma rápida e segura.
                            </p>
                            <div className="
                            flex 
                            space-x-4
                            ">
                                <Button
                                    onClick={() => window.location.href = "/register"}
                                    className="
                                bg-zinc-900
                                 text-green-600
                                ">
                                    Agendar Agora
                                    <ArrowRight
                                        className="
                                        ml-2
                                        h-5
                                        w-5
                                      " />
                                </Button>
                                <Button
                                    onClick={() => window.location.href = "/pt-BR/about"}
                                    className="
                                 hover:bg-white
                                  hover:text-zinc-900
                                ">
                                    Saiba Mais
                                </Button>
                            </div>
                        </div>
                        <img
                            className="
                        h-48
                        object-cover
                        rounded-full
                     " src={IMG} />
                    </div>
                </section>
                <section className="
                        py-20
                        bg-gradient-to-r from-zinc-900 to-green-800
                ">
                    <div className="
                        max-w-7xl
                        mx-auto
                        px-4 
                        sm:px-6
                        lg:px-8">
                        <div className="
                        text-center 
                        mb-16">
                            <h2 className="
                                text-5xl
                                font-bold">
                                Por que escolher o Agendão?
                            </h2>
                            <p className="
                                mt-4 
                                text-lg
                                text-zinc-400
                            ">
                                Simplicidade e eficiência para seu veículo
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6 bg-zinc-900 rounded-lg hover:shadow-lg transition">
                                <Clock className="h-12 w-12 text-green-600 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Agendamento Rápido</h3>
                                <p className="text-zinc-600">Marque seu horário em poucos cliques</p>
                            </div>

                            <div className="p-6 bg-zinc-900 rounded-lg hover:shadow-lg transition">
                                <MapPin className="h-12 w-12 text-green-600 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Profissionais Próximos</h3>
                                <p className="text-zinc-600">Encontre mecânicos qualificados na sua região</p>
                            </div>
                            <div className="p-6 bg-zinc-900 rounded-lg hover:shadow-lg transition">
                                <Star className="h-12 w-12 text-green-600 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Avaliações Reais</h3>
                                <p className="text-zinc-600">Feedback de clientes verificados</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-zinc-900">
                    <div className="
                        flex 
                        mt-10
                        rounded-sm
                        p-9
                        gap-4
                        items-start
                        justify-start
                        px-6
            ">
                        <div className="text-4xl space-y-3 ">
                            <h1 className=" font-bold">
                                É um mecânico? Tem uma oficina?
                            </h1>
                            <p className="
                                text-lg
                                text-zinc-400
                            ">
                                Cadastre sua oficina e expanda seus negócios. Gerencie agendamentos de forma eficiente e aumente sua visibilidade.
                            </p>
                            <Button
                                onClick={() => window.location.href = '/questions'}
                                className="w-80">Cadastre-se</Button>
                        </div>

                        <div className="flex p-4 flex-1 justify-center items-center">


                        </div>
                    </div>
                </section>
            </main>
            <footer className="p-4">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="/" className="flex items-center">
                            Agendão
                        </a>
                        <ul className="
                            flex
                            flex-wrap
                            items-center
                            mb-6
                            text-sm
                            font-medium
                            text-zinc-300
                            sm:mb-0
                            space-x-4
                            mt-6
                            md:mt-0
                        ">
                            <li>
                                <a
                                    href="/pt-BR/about"
                                    className="
                                    hover:underline 
                                    hover:text-green-800
                                ">
                                    Sobre
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/pt-BR/privacy-policy"
                                    className="
                                    hover:underline 
                                    hover:text-green-800
                                ">
                                    Política de Privacidade
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/pt-BR/contact"
                                    className="
                                    hover:underline
                                    hover:text-green-800
                                ">
                                    Contato
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}