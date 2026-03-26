import type { FastifyInstance } from 'fastify'
import { authenticate } from '../hooks/authenticate'
import { listStories, markAsViewed } from '../services/stories.service'
import { StoryListSchema, ErrorSchema } from '../schemas/openapi.schemas'

export default async function storiesRoutes(app: FastifyInstance) {
  app.get('/', {
    onRequest: [authenticate],
    schema: {
      tags: ['Stories'],
      summary: 'Listar stories ativos com flag de visualização',
      security: [{ bearerAuth: [] }],
      response: {
        200: StoryListSchema,
        500: ErrorSchema,
      },
    },
  }, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string }

    try {
      const stories = await listStories(userId)
      return reply.send(stories)
    } catch (err) {
      app.log.error(err)
      return reply.status(500).send({ error: 'INTERNAL_ERROR' })
    }
  })

  app.post('/:id/view', {
    onRequest: [authenticate],
    schema: {
      tags: ['Stories'],
      summary: 'Marcar story como visto',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
      },
      response: {
        204: { type: 'null' },
        404: ErrorSchema,
        500: ErrorSchema,
      },
    },
  }, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string }
    const { id } = request.params as { id: string }

    try {
      await markAsViewed(id, userId)
      return reply.status(204).send()
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'STORY_NOT_FOUND') {
        return reply.status(404).send({ error: 'STORY_NOT_FOUND' })
      }
      app.log.error(err)
      return reply.status(500).send({ error: 'INTERNAL_ERROR' })
    }
  })
}
