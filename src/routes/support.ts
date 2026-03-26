import type { FastifyInstance } from 'fastify'
import { authenticate } from '../hooks/authenticate'
import { createSession, listSessions, getMessages, sendMessage } from '../services/support.service'
import {
  SupportSessionSchema,
  SupportSessionListSchema,
  SupportMessageSchema,
  SupportMessageListSchema,
  ErrorSchema,
} from '../schemas/openapi.schemas'

export default async function supportRoutes(app: FastifyInstance) {
  app.post('/sessions', {
    onRequest: [authenticate],
    schema: {
      tags: ['Support'],
      summary: 'Abrir nova sessão de suporte',
      security: [{ bearerAuth: [] }],
      response: {
        201: SupportSessionSchema,
        500: ErrorSchema,
      },
    },
  }, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string }
    try {
      const session = await createSession(userId)
      return reply.status(201).send(session)
    } catch (err) {
      app.log.error(err)
      return reply.status(500).send({ error: 'INTERNAL_ERROR' })
    }
  })

  app.get('/sessions', {
    onRequest: [authenticate],
    schema: {
      tags: ['Support'],
      summary: 'Listar sessões de suporte do usuário',
      security: [{ bearerAuth: [] }],
      response: {
        200: SupportSessionListSchema,
        500: ErrorSchema,
      },
    },
  }, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string }
    try {
      const sessions = await listSessions(userId)
      return reply.send(sessions)
    } catch (err) {
      app.log.error(err)
      return reply.status(500).send({ error: 'INTERNAL_ERROR' })
    }
  })

  app.post('/sessions/:id/messages', {
    onRequest: [authenticate],
    schema: {
      tags: ['Support'],
      summary: 'Enviar mensagem e receber resposta do assistente',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
      },
      body: {
        type: 'object',
        required: ['content'],
        properties: {
          content: { type: 'string', minLength: 1, maxLength: 2000 },
        },
      },
      response: {
        200: SupportMessageSchema,
        400: ErrorSchema,
        404: ErrorSchema,
        500: ErrorSchema,
      },
    },
  }, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string }
    const { id } = request.params as { id: string }
    const { content } = request.body as { content: string }

    try {
      const response = await sendMessage(id, userId, content)
      return reply.send(response)
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'SESSION_NOT_FOUND') {
        return reply.status(404).send({ error: 'SESSION_NOT_FOUND' })
      }
      app.log.error(err)
      return reply.status(500).send({ error: 'INTERNAL_ERROR' })
    }
  })

  app.get('/sessions/:id/messages', {
    onRequest: [authenticate],
    schema: {
      tags: ['Support'],
      summary: 'Listar histórico de mensagens de uma sessão',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
      },
      response: {
        200: SupportMessageListSchema,
        404: ErrorSchema,
        500: ErrorSchema,
      },
    },
  }, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string }
    const { id } = request.params as { id: string }

    try {
      const messages = await getMessages(id, userId)
      return reply.send(messages)
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'SESSION_NOT_FOUND') {
        return reply.status(404).send({ error: 'SESSION_NOT_FOUND' })
      }
      app.log.error(err)
      return reply.status(500).send({ error: 'INTERNAL_ERROR' })
    }
  })
}
