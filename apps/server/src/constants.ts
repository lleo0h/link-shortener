process.loadEnvFile('.env')

export const DATABASE_URL = process.env.DATABASE_URL as string
if(!DATABASE_URL) throw new Error('Missing DATABASE_URL environment')