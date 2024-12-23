import dayjs from "dayjs";
import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    try {

        await request.jwtVerify({ onlyCookie: true, key: "refreshToken" })

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

        console.log(accessToken)
        const sevenDays = dayjs().add(7, "day").toDate()
        return reply.setCookie("refreshToken", refreshToken, {
            path: "/",
            secure: true,
            sameSite: true,
            httpOnly: true,
            expires: sevenDays
        }).send({ accessToken })
    } catch (e) {
        console.log(e)
    }
} 