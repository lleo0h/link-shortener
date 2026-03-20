import { defineConfig } from 'drizzle-kit'

process.loadEnvFile('.env')

export default defineConfig({
  out: 'drizzle',
  schema: 'src/db/drizzle.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string
  }
})