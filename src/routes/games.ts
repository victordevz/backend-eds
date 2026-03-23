import type { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export default async function gamesRoutes(app: FastifyInstance) {
  app.get('/', async (_request, reply) => {
    const games = await prisma.game.findMany({
      where: { status: 'OPEN' },
      orderBy: { startsAt: 'asc' },
    })
    return reply.send(games)
  })

  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const game = await prisma.game.findUnique({ where: { id } })
    if (!game) {
      return reply.status(404).send({ error: 'GAME_NOT_FOUND' })
    }
    return reply.send(game)
  })
}
