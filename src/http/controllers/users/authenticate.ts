import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeAuthenticateUserCase } from "../../../use-cases/factories/make-authenticate-user.use-case";
import { InvalidCredencialsError } from "../../../use-cases/errors/invalid-credencials-error";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const authenticateBody = z.object({
        username: z.string().min(5),
        password: z.string()
    })

    const { password, username } = authenticateBody.parse(request.body)

    const authenticateUserCase = MakeAuthenticateUserCase()

    try {
        const { user } = await authenticateUserCase.execute({
            password,
            username
        })

        const acessToken = await reply.jwtSign(
            {
                role: user.role
            }, {
            sign: {
                sub: user.id
            }
        })

        const refreshToken = await reply.jwtSign(
            {
                role: user.role,
            },
            {
                sign: {
                    sub: user.id,
                    expiresIn: "7d"
                }
            }
        )

        return reply.setCookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: true
        }).send({ acessToken })

    } catch (err) {
        if (err instanceof InvalidCredencialsError) {
            return reply.status(401).send({ message: err.message })
        }
        throw err
    }
}