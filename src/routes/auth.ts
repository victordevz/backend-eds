import type { FastifyInstance } from 'fastify'
import { registerSchema, loginSchema } from '../schemas/auth.schema'
import { createUser, verifyCredentials } from '../services/auth.service'

export default async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const result = registerSchema.safeParse(request.body)
    if (!result.success) {
      return reply.status(400).send({ error: 'VALIDATION_ERROR', details: result.error.issues })
    }
    const { email, password } = result.data
    try {
      const user = await createUser(email, password)
      const token = app.jwt.sign({ sub: user.id, email: user.email }, { expiresIn: '7d' })
      return reply.status(201).send({ token })
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'EMAIL_TAKEN') {
        return reply.status(409).send({ error: 'EMAIL_TAKEN' })
      }
      return reply.status(500).send({ error: 'INTERNAL_ERROR' })
    }
  })

  app.post('/login', async (request, reply) => {
    const result = loginSchema.safeParse(request.body)
    if (!result.success) {
      return reply.status(400).send({ error: 'VALIDATION_ERROR', details: result.error.issues })
    }
    const { email, password } = result.data
    try {
      const user = await verifyCredentials(email, password)
      const token = app.jwt.sign({ sub: user.id, email: user.email }, { expiresIn: '7d' })
      return reply.status(200).send({ token })
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'INVALID_CREDENTIALS') {
        return reply.status(401).send({ error: 'INVALID_CREDENTIALS' })
      }
      return reply.status(500).send({ error: 'INTERNAL_ERROR' })
    }
  })
}
