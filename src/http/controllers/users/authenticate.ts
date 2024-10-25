import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeAuthenticateUserCase } from "../../../use-cases/factories/make-authenticate-user.use-case";
import { InvalidCredencialsError } from "../../../use-cases/errors/invalid-credencials-error";
import { KafkaProducer } from "../../../kafka/producer";
import dayjs from "dayjs";

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

        const accessToken = await reply.jwtSign(
            {
                role: user.role
            }, {
            sign: {
                sub: user.id
            } // expiresIn: "10m"
        })

        const refreshToken = await reply.jwtSign(
            {
                role: user.role,
            },
            {
                sign: {
                    sub: user.id,
                }
            }
        )

        /**
         * register of mechanics or boss in chat-mechanic(mongoDB)
         */
        if (user.role !== "CLIENT") {
            const kafkaProducer = new KafkaProducer()
            kafkaProducer.exec("login-mechanic", {
                external_id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            })
        }

        const sevenDays = dayjs().add(7, "day").toDate()
        return reply.setCookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: true,
            expires: sevenDays
        }).send({ accessToken })

    } catch (err) {
        if (err instanceof InvalidCredencialsError) {
            return reply.status(401).send({ message: err.message })
        }
        throw err
    }
}