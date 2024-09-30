import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    NODE_ENV: z.enum(["dev", "test", "producion"]).default("dev"),
    MONGODB_URI: z.string().url().default("mongodb://root:docker123@localhost:27017/mongodb")
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.log("Error in environment variables ❌", _env.error.format())
    throw new Error("❌ Error in environment variables ")
}

export const env = _env.data