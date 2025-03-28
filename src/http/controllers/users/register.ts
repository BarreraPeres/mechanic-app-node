import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeRegisterUserUseCase } from "../../../use-cases/factories/make-register-user.use-case";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";
import { KafkaProducer } from "../../../kafka/producer";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBody = z.object({
        name: z.string().min(5),
        password: z.string().min(5),
        email: z.string().email(),
        cpf: z.string(),
        role: z.enum(["CLIENT", "BOSS", "EMPLOYEE"])
    })

    const { password, cpf, email, name, role } = registerBody.parse(request.body)
    const registerUserUseCase = MakeRegisterUserUseCase()

    try {

        const { user } = await registerUserUseCase.execute({
            password, cpf, email, name, role
        })

        /**
         * register users in chat-mechanic(mongoDB)
         */
        const kafkaProducer = new KafkaProducer()
        await kafkaProducer.exec('login-user', {
            external_id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        })



        return reply.status(201).send({ user })

    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(400).send({ message: err.message })
        }
        throw err
    }

}