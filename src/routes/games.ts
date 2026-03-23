import type { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { GameSchema, ErrorSchema } from '../schemas/openapi.schemas'

export default async function gamesRoutes(app: FastifyInstance) {
  app.get('/', {
    schema: {
      tags: ['Games'],
      summary: 'Listar jogos abertos',
      response: {
        200: {
          type: 'array',
          items: GameSchema,
        },
      },
    },
  }, async (_request, reply) => {
    const games = await prisma.game.findMany({
      where: { status: 'OPEN' },
      orderBy: { startsAt: 'asc' },
    })
    return reply.send(games)
  })

  app.get('/:id', {
    schema: {
      tags: ['Games'],
      summary: 'Buscar jogo por ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
      },
      response: {
        200: GameSchema,
        404: ErrorSchema,
      },
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const game = await prisma.game.findUnique({ where: { id } })
    if (!game) {
      return reply.status(404).send({ error: 'GAME_NOT_FOUND' })
    }
    return reply.send(game)
  })
}
