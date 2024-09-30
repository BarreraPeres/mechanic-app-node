import fastifyStatic from "@fastify/static"
import { fastify } from "fastify"
import { join } from "node:path"
import { Server } from "socket.io"
import { start } from "./kafka/consumer"
import fastifyCookie from "@fastify/cookie"
import fastifyCors from "@fastify/cors"

export const app = fastify()

app.register(fastifyCors, {
    origin: "http://localhost:3333",
    credentials: true,
}) // here my back where shipping the cookiee

app.register(fastifyStatic, {
    root: join(__dirname, "../public"),
    prefix: "/"
})

export const io = new Server(app.server, {
    cors: {
        origin: "*"
    }
})

app.register(fastifyCookie)

app.ready().then(() => {
    io.on("connection", (socket) => {
        console.log("socket_id: ", socket.id)
    })

    start().then(() => {
        console.log("kafka is run!")
    })

})

