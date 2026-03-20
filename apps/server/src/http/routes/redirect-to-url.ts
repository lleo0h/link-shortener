import { Elysia, NotFoundError, t } from 'elysia'
import { db, links } from '../../db/drizzle.ts'
import { eq } from 'drizzle-orm'

export const redirectToUrl = new Elysia()
  .get('/:code', async ({ params, redirect }) => {
    const { code } = params
    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.code, code))

    if(!link) throw new NotFoundError('Link not found')

    return redirect(link.original_url)
  }, {
    params: t.Object({
      code: t.String({
        minLength: 10,
        maxLength: 10
      })
    })
  })