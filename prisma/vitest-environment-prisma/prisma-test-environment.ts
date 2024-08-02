//import "dotenv/config"

import { PrismaClient } from "@prisma/client"
import { execSync } from "child_process"
import { randomUUID } from "crypto"
import { Environment } from "vitest"
const prisma = new PrismaClient()

// "postgresql://docker:docker@localhost:5433/db-mechanics-pg?schema=public"

function ramdomDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL Environment Not Found!")
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set("schema", schema)

    return url.toString()
}


export default <Environment>{
    name: "prisma",
    transformMode: "ssr",
    async setup() {
        const schema = randomUUID()
        const dataBaseUrl = ramdomDatabaseUrl(schema)

        process.env.DATABASE_URL = dataBaseUrl

        execSync("npx prisma migrate deploy")



        return {
            async teardown() {
                await prisma.$executeRawUnsafe
                    (`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

                await prisma.$disconnect()
            },
        }
    },
}