import 'dotenv/config'
import Fastify from 'fastify'
import corsPlugin from './plugins/cors'
import jwtPlugin from './plugins/jwt'
import authRoutes from './routes/auth'
import gamesRoutes from './routes/games'

const app = Fastify({ logger: true })

app.register(corsPlugin)
app.register(jwtPlugin)

app.register(authRoutes, { prefix: '/auth' })
app.register(gamesRoutes, { prefix: '/games' })

const port = Number(process.env.PORT) || 3000

app.listen({ port, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
