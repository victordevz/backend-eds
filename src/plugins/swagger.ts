import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'

export default fp(async function swaggerPlugin(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'EDS Apostas API',
        description: 'Backend da casa de apostas EDS — hackathon',
        version: '1.0.0',
      },
      tags: [
        { name: 'Auth', description: 'Registro e login de usuários' },
        { name: 'Games', description: 'Listagem pública de jogos disponíveis' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  })
})
