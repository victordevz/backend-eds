import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.game.createMany({
    data: [
      {
        homeTeam: 'Flamengo',
        awayTeam: 'Palmeiras',
        oddsHome: 2.1,
        oddsDraw: 3.2,
        oddsAway: 2.8,
        status: 'OPEN',
        startsAt: new Date('2026-04-05T19:00:00Z'),
      },
      {
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        oddsHome: 1.9,
        oddsDraw: 3.5,
        oddsAway: 3.0,
        status: 'OPEN',
        startsAt: new Date('2026-04-06T20:00:00Z'),
      },
      {
        homeTeam: 'Manchester City',
        awayTeam: 'Liverpool',
        oddsHome: 2.2,
        oddsDraw: 3.1,
        oddsAway: 2.6,
        status: 'OPEN',
        startsAt: new Date('2026-04-07T18:30:00Z'),
      },
      {
        homeTeam: 'São Paulo',
        awayTeam: 'Corinthians',
        oddsHome: 2.4,
        oddsDraw: 3.0,
        oddsAway: 2.5,
        status: 'OPEN',
        startsAt: new Date('2026-04-08T21:00:00Z'),
      },
      {
        homeTeam: 'Bayern Munich',
        awayTeam: 'Borussia Dortmund',
        oddsHome: 1.7,
        oddsDraw: 3.8,
        oddsAway: 4.2,
        status: 'OPEN',
        startsAt: new Date('2026-04-09T19:30:00Z'),
      },
    ],
    skipDuplicates: true,
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
