import { Elysia, t } from 'elysia'
import { db, generateBase32Id, links } from '../../db/drizzle.ts'

export const createShorterUrl = new Elysia()
  .post('links', async ({ body }) => {
    const { url } = body
    const data = { original_url: url, code: generateBase32Id() }
    await db.insert(links).values(data)
    return data
  }, {
    body: t.Object({
      url: t.String({ format: 'uri' })
    })
  })