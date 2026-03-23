import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import scalarPlugin from '@scalar/fastify-api-reference'

export default fp(async function scalarDocs(app: FastifyInstance) {
  await app.register(scalarPlugin, {
    routePrefix: '/docs',
    configuration: {
      spec: { url: '/documentation/json' },
      theme: 'purple',
    },
  })
})
