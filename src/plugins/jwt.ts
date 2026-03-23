import type { FastifyInstance } from 'fastify'
import jwtPlugin from '@fastify/jwt'

export default async function registerJwt(app: FastifyInstance) {
  await app.register(jwtPlugin, {
    secret: process.env.JWT_SECRET as string,
  })
}
