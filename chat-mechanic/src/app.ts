import fastifyStatic from "@fastify/static"
import { fastify } from "fastify"
import { join } from "node:path"
import { Server } from "socket.io"

export const app = fastify()

app.register(fastifyStatic, {
    root: join(__dirname, "../public"),
    prefix: "/"
})

export const io = new Server(app.server, {
    cors: {
        origin: "*"
    }
})

app.ready().then(() => {
    io.on("connection", (socket) => {
        console.log("socket_id: ", socket.id)
    })
})
