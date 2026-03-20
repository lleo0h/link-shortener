import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { cors } from '@elysiajs/cors'
import { createShorterUrl } from './routes/create-shorter-url.ts'
import { redirectToUrl } from './routes/redirect-to-url.ts'

new Elysia({ adapter: node() })
  .use(cors({ origin: '*' }))
  .use(createShorterUrl)
  .use(redirectToUrl)
  .listen(3000)