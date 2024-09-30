import { env } from "./env/index";
import { app } from "./app";

app.listen({ port: env.PORT || 3333, host: '0.0.0.0' }).then((address) => {
    console.log(`SERVER IS RUNNING in ${address} 🚀`)
})