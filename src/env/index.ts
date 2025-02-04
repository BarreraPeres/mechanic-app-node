import "dotenv/config"
import { z } from "zod"


const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    URL_FRONTEND: z.string().default("http://localhost:5173")
})


const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error("❌ Error in environment variables:", _env.error.format())
    throw new Error("❌ Error in environment variables ")
}


export const env = _env.data


