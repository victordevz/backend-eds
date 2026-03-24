import type { FastifyInstance } from 'fastify'
import { authenticate } from '../hooks/authenticate'
import { createDeposit, getDeposit } from '../services/wallet.service'
import { DepositSchema, ErrorSchema } from '../schemas/openapi.schemas'

export default async function walletRoutes(app: FastifyInstance) {
  app.post('/deposits', {
    onRequest: [authenticate],
    schema: {
      tags: ['Wallet'],
      summary: 'Criar depósito PIX',
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        required: ['amount'],
        properties: {
          amount: { type: 'number', minimum: 0.01, maximum: 10000 },
        },
      },
      response: {
        201: DepositSchema,
        400: ErrorSchema,
        500: ErrorSchema,
      },
    },
  }, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string }
    const { amount } = request.body as { amount: number }

    try {
      const deposit = await createDeposit(userId, amount)
      return reply.status(201).send(deposit)
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'INVALID_AMOUNT') {
        return reply.status(400).send({ error: 'INVALID_AMOUNT' })
      }
      app.log.error(err)
      return reply.status(500).send({ error: 'INTERNAL_ERROR' })
    }
  })

  app.get('/deposits/:id', {
    onRequest: [authenticate],
    schema: {
      tags: ['Wallet'],
      summary: 'Consultar status do depósito',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
      },
      response: {
        200: DepositSchema,
        404: ErrorSchema,
        500: ErrorSchema,
      },
    },
  }, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string }
    const { id } = request.params as { id: string }

    try {
      const deposit = await getDeposit(id, userId)
      return reply.send(deposit)
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'DEPOSIT_NOT_FOUND') {
        return reply.status(404).send({ error: 'DEPOSIT_NOT_FOUND' })
      }
      app.log.error(err)
      return reply.status(500).send({ error: 'INTERNAL_ERROR' })
    }
  })
}
