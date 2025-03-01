import { z } from "zod";
import { Icon } from "../components/icon";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserService } from "../services/user/register-user.service";
import { useState } from "react";
import { Spinner } from "../components/ui/spinner";

interface registerProps {
    status: (s: number) => void
}

function onLoading() {
    return (
        <>
            <Spinner size="default" />
        </>
    )
}

export function Register({ status }: registerProps) {
    const [isLoading, setIsLoading] = useState(false)

    const registerForm = z.object({
        cpf: z.string().min(11, "O CPF deve ter 11 dígitos"),
        email: z.string().email("O email deve ser válido"),
        name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
        password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        role: z.enum(["EMPLOYEE", "BOSS", "CLIENT"]),
        confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Senhas devem ser iguais",
        path: ["confirmPassword"]
    })


    type registerType = z.infer<typeof registerForm>
    const { handleSubmit, register, formState, control } = useForm<registerType>({
        resolver: zodResolver(registerForm)
    })

    async function handleRegister({ password, cpf, email, name, role }: registerType) {
        try {
            setIsLoading(true)
            let res = await RegisterUserService({
                cpf,
                email,
                name,
                password,
                role
            })
            status(res.status)
        } catch (e: any) {
            if (e) {
                e.status === 400 ? (
                    alert("User Already Exists!")
                ) : (
                    alert("Internal Server Error!")
                )
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="
        flex
        flex-col
        justify-center
        items-center
        min-h-screen
        bg-gradient-to-r from-zinc-900 to-emerald-900    
        ">
            <div className="bg-zinc-800 w-[500px] max-w-full rounded-lg mt-10 mb-10">
                <div
                    className="
                    justify-center
                    mt-4
                ">
                    <div
                        className="
                        flex 
                        flex-col 
                        items-center
                        gap-2
                         ">
                        <Icon />
                        <p
                            className="
                            font-bold 
                            text-xl  
                           text-zinc-300
                        ">
                            Cadastre-se gratuitamente
                        </p>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="flex flex-col p-7 gap-6">
                    <div className="flex flex-col gap-2 text-sm text-zinc-400">
                        <label htmlFor="name">Nome</label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Seu Nome"
                            {...register("name")}
                        />
                        {formState.errors.name && (
                            <p className="text-red-400 text-xs ml-36 absolute">
                                {formState.errors.name.message}
                            </p>
                        )
                        }

                    </div>

                    <div className="flex flex-col gap-2 text-sm text-zinc-400">
                        <label htmlFor="email">E-mail</label>
                        <Input
                            id="email"
                            type="text"
                            required
                            autoComplete="email"
                            placeholder="Seu Email"
                            {...register("email")}
                        />
                        {formState.errors.email && (
                            <p className="text-red-400 text-xs ml-36 absolute">
                                {formState.errors.email.message}
                            </p>
                        )
                        }

                    </div>
                    <div className="flex flex-col gap-2 text-sm text-zinc-400">
                        <label htmlFor="cpf">Cpf</label>
                        <Input
                            id="cpf"
                            type="text"
                            required
                            autoComplete="cpf"
                            placeholder="Seu Cpf"
                            {...register("cpf")}
                        />
                        {formState.errors.cpf && (
                            <p className="text-red-400 text-xs ml-36 absolute">
                                {formState.errors.cpf.message}
                            </p>
                        )
                        }
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-zinc-400">
                        <label htmlFor="role">O Que Você é?</label>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <select
                                        {...field}
                                        className="
                                        p-4
                                        w-full
                                        caret-green-800
                                        focus:border-green-800
                                        focus:outline-green-800
                                        focus:ring-green-500
                                        bg-black border 
                                        border-zinc-900
                                        rounded-lg
                                        placeholder-zinc-400
                                        outline-none
                                        text-sm
                                        hover:bg-zinc-800
                                        ring-zinc-900
                                    ">
                                        <option value="CLIENT">
                                            Cliente, irei Procurar Oficinas
                                        </option>
                                        <option value="EMPLOYEE">
                                            Empregado, trabalho para uma Oficina
                                        </option>
                                        <option value="BOSS">
                                            Chefe, tenho uma Oficina
                                        </option>
                                    </select>
                                )
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-zinc-400">
                        <label htmlFor="password">Sua Senha</label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="No mínimo 6 caracteres"
                            required
                            {...register("password")}
                        />
                        {formState.errors.password && (
                            <p className="text-red-400 text-xs ml-36 absolute">
                                {formState.errors.password.message}
                            </p>
                        )
                        }
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-zinc-400">
                        <label htmlFor="confirmPassword">Confirme sua senha </label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="No mínimo 6 caracteres"
                            required
                            {...register("confirmPassword")}
                        />
                        {formState.errors.confirmPassword && (
                            <p className="text-red-400 text-xs ml-36 absolute">
                                {formState.errors.confirmPassword.message}
                            </p>
                        )
                        }
                    </div>

                    <div className="flex flex-col gap-3 -mt-4">
                        <Button>
                            {isLoading ? onLoading() : "Cadastrar-se"}
                        </Button>
                        <Button
                            onClick={() => {
                                window.location.href = "/login"
                            }}
                            className="group">
                            <a
                                href="/login"
                                className="text-sm text-green-400 group-hover:text-green-600">
                                Já tem Conta?
                            </a> ↩ </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}