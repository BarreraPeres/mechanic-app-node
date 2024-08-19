
import { app } from "./app";
import "./server-side/chat"


app.listen({ port: 4000 }).then((address) => {
    console.log(`chat is running in ${address} 🚀 `)
})