
import { env } from "./env/index";
import { app } from "./app";




app.listen({ port: env.PORT || 3335, host: '0.0.0.0' }).then(() => {
    console.log("SERVER IS RUNNING...🚀")
})