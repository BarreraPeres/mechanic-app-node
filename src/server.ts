
import { env } from "./env/index.ts";
import { app } from "./app";




app.listen({ port: env.PORT || 3333, host: '0.0.0.0' }).then(() => {
    console.log("SERVER IS RUNNING...🚀")
})