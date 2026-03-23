import 'dotenv/config'
import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import scalarPlugin from '@scalar/fastify-api-reference'
import corsPlugin from './plugins/cors'
import jwtPlugin from './plugins/jwt'
import authRoutes from './routes/auth'
import gamesRoutes from './routes/games'

const app = Fastify({ logger: true })

app.register(swagger, {
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

app.register(scalarPlugin, {
  routePrefix: '/docs',
  configuration: {
    spec: { url: '/openapi.json' },
    theme: 'purple',
  },
})

app.register(corsPlugin)
app.register(jwtPlugin)

app.register(authRoutes, { prefix: '/auth' })
app.register(gamesRoutes, { prefix: '/games' })

app.get('/openapi.json', { schema: { hide: true } }, async () => app.swagger())

const port = Number(process.env.PORT) || 3000

app.listen({ port, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
