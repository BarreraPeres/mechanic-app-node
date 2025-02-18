import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Breadcrumb } from "flowbite-react";

export function Questions() {
    return (
        <div className="
        flex
        flex-col
        w-auto
        h-auto 
        mt-40
    ">
            <nav
                className="
                flex
                ml-6
                mb-2
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
                </Breadcrumb>
            </nav>
            <h1 className="
                text-3xl
                pl-6
                items-start
                font-bold
                leading-tight
                justify-start
            ">Você já fez o login em nossa
                <p
                    className="
                    pl-2
                    bg-gradient-to-r 
                    from-green-600
                    via-green-500
                    to-green-900
                    inline-block 
                    text-transparent
                    bg-clip-text
            ">
                    plataforma?
                </p>
            </h1>
            <div className="
                flex 
                p-6
                mt-6
                space-x-4
            ">

                <Button
                    onClick={() => window.location.href = "/register"}
                    className="
                                 hover:bg-white
                                  hover:text-zinc-900
                                ">
                    Criar Conta
                </Button>
                <Button
                    onClick={() => window.location.href = "/register-mechanic"}
                    className="
                    bg-zinc-900
                    text-green-600
                    hover:text-white
                     hover:underline 
                    text-xl
                ">
                    Sim, Registrar Minha Oficina
                    <ArrowRight
                        className="
                        ml-2
                        h-5
                        w-5
                    "/>
                </Button>

            </div>
        </div >
    )
}
