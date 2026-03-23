import type { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

export default async function corsPlugin(app: FastifyInstance) {
  await app.register(cors, {
    origin: process.env.ALLOWED_ORIGIN ?? '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
}
