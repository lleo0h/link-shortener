import { drizzle } from 'drizzle-orm/node-postgres'
import { text, pgTable, varchar, bigserial, timestamp, index } from 'drizzle-orm/pg-core'
import { DATABASE_URL } from '../constants.ts'
import crypto from 'node:crypto'

const BASE32 = 'ABCDEFGHJKMNPQRSTVWXYZ0123456789'

export function generateBase32Id() {
  const bytes = crypto.randomBytes(10)
  let r = ''
  for(let i = 0; i < 10; i++) r += BASE32[bytes[i]! % BASE32.length]
  return r
}

export const links = pgTable('links', {
  id: bigserial({ mode: 'bigint' }).primaryKey(),
  original_url: text().notNull(),
  code: varchar({ length: 10 }).notNull().unique(),
  created_at: timestamp().notNull().defaultNow()
}, (table) => ([index('code_idx').on(table.code)]))

export const db = drizzle(DATABASE_URL, { schema: { links } })