import { env } from "../env";
import { app } from "./app";
import { routes } from "./http/routes";

//server-side socket.io
import "./server-side/chat"

// routes
app.register(routes)

app.listen({ port: env.PORT }).then((address) => {
    console.log(`chat is running in ${address} 🚀 `)
})