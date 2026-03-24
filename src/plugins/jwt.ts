import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import jwtPlugin from '@fastify/jwt'

export default fp(async function registerJwt(app: FastifyInstance) {
  await app.register(jwtPlugin, {
    secret: process.env.JWT_SECRET as string,
  })
})
