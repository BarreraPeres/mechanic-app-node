
import { defineConfig } from "vitest/config"
import "dotenv/config"
export default defineConfig({
    test: {
        //include: ['src/use-cases/*.test.ts'],
        environmentMatchGlobs: [
            ['src/use-cases/*.test.ts'],
            ['src/http/controllers/**/*.test.ts', 'prisma']]
    },
})
