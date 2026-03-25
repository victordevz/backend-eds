import type { FastifyInstance } from 'fastify'
import { listCasinoGames } from '../services/catalog.service'
import { CasinoGameListSchema, ErrorSchema } from '../schemas/openapi.schemas'

export default async function catalogRoutes(app: FastifyInstance) {
  app.get('/', {
    schema: {
      tags: ['Catalog'],
      summary: 'Listar jogos do cassino',
      querystring: {
        type: 'object',
        properties: {
          category: { type: 'string', enum: ['slots', 'crash', 'roulette', 'blackjack'] },
          provider: { type: 'string' },
          section: { type: 'string', enum: ['featured', 'popular', 'new'] },
          page: { type: 'integer', minimum: 1, default: 1 },
          limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
        },
      },
      response: {
        200: CasinoGameListSchema,
        400: ErrorSchema,
        500: ErrorSchema,
      },
    },
  }, async (request, reply) => {
    const { category, provider, section, page = 1, limit = 20 } = request.query as {
      category?: string
      provider?: string
      section?: string
      page?: number
      limit?: number
    }

    try {
      const result = await listCasinoGames({ category, provider, section, page, limit })
      return reply.send(result)
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'INVALID_CATEGORY') {
        return reply.status(400).send({ error: 'INVALID_CATEGORY' })
      }
      app.log.error(err)
      return reply.status(500).send({ error: 'INTERNAL_ERROR' })
    }
  })
}
