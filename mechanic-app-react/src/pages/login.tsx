import { z } from "zod";
import { Icon } from "../components/icon";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserService } from "../services/login-user.service";

interface LoginProps {
    status: (s: number) => void
}
export function Login({ status }: LoginProps) {

    const loginForm = z.object({
        username: z.string(),
        password: z.string()
    })
    type LoginForm = z.infer<typeof loginForm>
    const { handleSubmit, register, } = useForm<LoginForm>({
        resolver: zodResolver(loginForm)
    })

    async function handleLogin({ password, username }: LoginForm) {
        try {
            let res = await LoginUserService({
                password,
                username
            })
            localStorage.setItem("accessToken", res.accessToken)

            status(res.status)
        } catch (e: any) {
            if (e) {
                e.status === 401 ? (
                    alert("Unauthorized")
                ) : (
                    alert("invalid credencials!")
                )
            }
        }
    }


    return (
        <main className="
                flex
                flex-col
                justify-center
                items-center
                mt-10
            ">
            <div className="
                bg-zinc-800
                w-[500px]
                h-[580px]
                rounded-lg 
               ">
                <div
                    className="
                    flex 
                    flex-col
                    justify-center 
                    items-center
                    mb-10
                    mt-10
                    ">
                    <Icon />
                </div>
                <div className="flex flex-col items-start ml-7">
                    <strong
                        className="
                        text-zinc-300 
                        font-bold 
                        text-xl 
                    ">Acesse Sua Conta</strong>
                </div>
                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="flex flex-col p-7 gap-6">
                    <div className="flex flex-col gap-2 text-sm text-zinc-400">
                        <label htmlFor="username">E-mail ou Cpf</label>
                        <Input
                            id="username"
                            type="text"
                            required
                            autoComplete="username"
                            placeholder="Seu e-mail ou cpf"
                            {...register("username")}
                        />

                    </div>
                    <div className="flex flex-col gap-2 text-sm text-zinc-400">
                        <label htmlFor="password">Senha</label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Sua senha"
                            autoComplete="current-password"
                            required
                            {...register("password")}
                        />
                    </div>

                    <div className="flex flex-col gap-4 mt-5">
                        <Button >Entrar</Button>
                        <Button
                            onClick={() => {
                                window.location.href = "/register"
                            }}
                            className="group">
                            <a
                                href="/register"
                                className="
                                text-sm
                                text-green-400
                                group-hover:text-green-600
                                  ">
                                Não tem conta?
                            </a>
                            Registre-se
                        </Button>
                        <div
                            className="
                            flex-1
                            flex
                            items-center
                            text-zinc-200
                            text-sm
                            font-bold 
                                ">
                            Você é um mecânico?
                            <Button
                                className="
                                flex 
                                flex-1
                                 ml-48
                                "
                                onClick={() => {
                                    window.location.href = "/register-mechanic"
                                }}>
                                <a
                                    href="/register-mechanic"
                                    className="
                                    text-sm
                                     text-zinc-300 
                                     ">
                                    Registre-se
                                </a>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}