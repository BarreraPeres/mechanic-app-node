import dayjs from "dayjs";
import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify({ onlyCookie: true })



    const { role } = request.user

    const accessToken = await reply.jwtSign(
        { role }, {
        sign: {
            sub: request.user.sub
        }
    })

    const refreshToken = await reply.jwtSign(
        { role },
        {
            sign: {
                sub: request.user.sub,
            }
        }
    )

    const sevenDays = dayjs().add(7, "day").toDate()
    return reply.setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
        expires: sevenDays
    }).send({ accessToken })
} 