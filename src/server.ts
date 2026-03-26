import 'dotenv/config'
import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import scalarPlugin from '@scalar/fastify-api-reference'
import corsPlugin from './plugins/cors'
import jwtPlugin from './plugins/jwt'
import authRoutes from './routes/auth'
import gamesRoutes from './routes/games'
import walletRoutes from './routes/wallet'
import catalogRoutes from './routes/catalog'
import storiesRoutes from './routes/stories'
import supportRoutes from './routes/support'

const app = Fastify({ logger: true })

app.addContentTypeParser('application/json', { parseAs: 'string' }, function (_req, body, done) {
  if (!body || (body as string).trim() === '') {
    done(null, {})
    return
  }
  try {
    done(null, JSON.parse(body as string))
  } catch (err) {
    done(err as Error, undefined)
  }
})

app.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'EDS Apostas API',
      description: 'Backend Esporte da Sorte — hackathon',
      version: '1.0.0',
    },
    tags: [
      { name: 'Auth', description: 'Registro e login de usuários' },
      { name: 'Games', description: 'Listagem pública de jogos disponíveis' },
      { name: 'Wallet', description: 'Depósitos via PIX simulado' },
      { name: 'Catalog', description: 'Catálogo de jogos do cassino' },
      { name: 'Stories', description: 'Stories promocionais em vídeo' },
      { name: 'Support', description: 'Chatbot de suporte via OpenAI' },
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
app.register(walletRoutes, { prefix: '/wallet' })
app.register(catalogRoutes, { prefix: '/catalog' })
app.register(storiesRoutes, { prefix: '/stories' })
app.register(supportRoutes, { prefix: '/support' })

app.get('/openapi.json', { schema: { hide: true } }, async () => app.swagger())

const port = Number(process.env.PORT) || 3000

app.listen({ port, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
