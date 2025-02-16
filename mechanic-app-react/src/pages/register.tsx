import { z } from "zod";
import { Icon } from "../components/icon";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserService } from "../services/register-user.service";

interface registerProps {
    status: (s: number) => void
}
export function Register({ status }: registerProps) {

    const registerForm = z.object({
        cpf: z.string().min(11, "O CPF deve ter 11 dígitos"),
        email: z.string().email("O email deve ser válido"),
        name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
        password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Senhas devem ser iguais",
        path: ["confirmPassword"]
    })


    type registerType = z.infer<typeof registerForm>
    const { handleSubmit, register, formState } = useForm<registerType>({
        resolver: zodResolver(registerForm)
    })

    async function handleRegister({ password, cpf, email, name }: registerType) {
        try {
            let res = await RegisterUserService({
                cpf,
                email,
                name,
                password
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
        }
    }


    return (
        <main className="flex flex-col justify-center items-center mt-10 mb-10">
            <div className="bg-zinc-800 w-[500px] h-[700px] rounded-lg ">
                <div>

                </div>

                <div
                    className="
                    flex
                    flex-1
                    gap-3
                    justify-center
                    items-center
                    mt-4
                    font-bold text-xl 
                    text-zinc-300
                ">
                    <Icon />
                    Cadastre-se gratuitamente
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
                        <Button >Cadastrar-se</Button>
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