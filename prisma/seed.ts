import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, GameCategory } from '@prisma/client'

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

  const casinoGames = [
    {
      title: 'Gates of Olympus',
      provider: 'Pragmatic Play',
      category: GameCategory.SLOTS,
      sections: ['featured', 'popular'],
      badge: 'HOT',
      multiplier: '5000x',
      accent: '#3A86FF',
      gameUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vs20olympgate&lang=pt&cur=BRL&lobbyUrl=about:blank',
      imageUrl: null,
      active: true,
    },
    {
      title: 'Sweet Bonanza',
      provider: 'Pragmatic Play',
      category: GameCategory.SLOTS,
      sections: ['featured', 'popular'],
      badge: 'HOT',
      multiplier: '21100x',
      accent: '#FB5607',
      gameUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vs20fruitsw&lang=pt&cur=BRL&lobbyUrl=about:blank',
      imageUrl: null,
      active: true,
    },
    {
      title: 'Sugar Rush',
      provider: 'Pragmatic Play',
      category: GameCategory.SLOTS,
      sections: ['popular', 'new'],
      badge: 'NOVO',
      multiplier: '5000x',
      accent: '#FF006E',
      gameUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vs20sugarrush&lang=pt&cur=BRL&lobbyUrl=about:blank',
      imageUrl: null,
      active: true,
    },
    {
      title: 'Starlight Princess',
      provider: 'Pragmatic Play',
      category: GameCategory.SLOTS,
      sections: ['popular'],
      badge: null,
      multiplier: '5000x',
      accent: '#8338EC',
      gameUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vs20starlight&lang=pt&cur=BRL&lobbyUrl=about:blank',
      imageUrl: null,
      active: true,
    },
    {
      title: 'Big Bass Bonanza',
      provider: 'Pragmatic Play',
      category: GameCategory.SLOTS,
      sections: ['popular'],
      badge: null,
      multiplier: '2100x',
      accent: '#0077B6',
      gameUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vs10bbbonanza&lang=pt&cur=BRL&lobbyUrl=about:blank',
      imageUrl: null,
      active: true,
    },
    {
      title: 'Fortune Tiger',
      provider: 'PG Soft',
      category: GameCategory.SLOTS,
      sections: ['featured', 'popular'],
      badge: 'HOT',
      multiplier: '2500x',
      accent: '#FF6B00',
      gameUrl: 'https://m.pgsoft-games.com/44/index.html?l=pt&ot=98&btt=2&from=https%3A%2F%2Fpgsoft.com&__refer=m.pgsoft-games.com&or=static.pgsoft-games.com',
      imageUrl: null,
      active: true,
    },
    {
      title: 'Mahjong Ways',
      provider: 'PG Soft',
      category: GameCategory.SLOTS,
      sections: ['popular'],
      badge: null,
      multiplier: '1500x',
      accent: '#E63946',
      gameUrl: 'https://m.pgsoft-games.com/50/index.html?l=pt&ot=98&btt=2&from=https%3A%2F%2Fpgsoft.com&__refer=m.pgsoft-games.com&or=static.pgsoft-games.com',
      imageUrl: null,
      active: true,
    },
    {
      title: 'Fortune Mouse',
      provider: 'PG Soft',
      category: GameCategory.SLOTS,
      sections: ['featured', 'new'],
      badge: 'NOVO',
      multiplier: '1000x',
      accent: '#FFD60A',
      gameUrl: 'https://m.pgsoft-games.com/53/index.html?l=pt&ot=98&btt=2&from=https%3A%2F%2Fpgsoft.com&__refer=m.pgsoft-games.com&or=static.pgsoft-games.com',
      imageUrl: null,
      active: true,
    },
    {
      title: 'Wild Bandito',
      provider: 'PG Soft',
      category: GameCategory.SLOTS,
      sections: ['popular'],
      badge: null,
      multiplier: '2500x',
      accent: '#FF6B35',
      gameUrl: 'https://m.pgsoft-games.com/92/index.html?l=pt&ot=98&btt=2&from=https%3A%2F%2Fpgsoft.com&__refer=m.pgsoft-games.com&or=static.pgsoft-games.com',
      imageUrl: null,
      active: true,
    },
    {
      title: 'Leprechaun Riches',
      provider: 'PG Soft',
      category: GameCategory.SLOTS,
      sections: ['new'],
      badge: 'NOVO',
      multiplier: '2000x',
      accent: '#2DC653',
      gameUrl: 'https://m.pgsoft-games.com/45/index.html?l=pt&ot=98&btt=2&from=https%3A%2F%2Fpgsoft.com&__refer=m.pgsoft-games.com&or=static.pgsoft-games.com',
      imageUrl: null,
      active: true,
    },
    {
      title: 'Candy Superwin',
      provider: 'PG Soft',
      category: GameCategory.SLOTS,
      sections: ['new'],
      badge: 'NOVO',
      multiplier: '3000x',
      accent: '#FF85A1',
      gameUrl: 'https://m.pgsoft-games.com/91/index.html?l=pt&ot=98&btt=2&from=https%3A%2F%2Fpgsoft.com&__refer=m.pgsoft-games.com&or=static.pgsoft-games.com',
      imageUrl: null,
      active: true,
    },
  ]

  for (const game of casinoGames) {
    await prisma.casinoGame.upsert({
      where: { title: game.title },
      update: { gameUrl: game.gameUrl, active: game.active },
      create: game,
    })
  }

  const stories = [
    {
      title: '1 MILHÃO',
      videoUrl: 'https://igbxyvhkcaynscxmouyw.supabase.co/storage/v1/object/public/story-videos/WhatsApp%20Video%202026-03-25%20at%2023.47.54.mp4',
      order: 1,
    },
    {
      title: 'COTAÇÕES',
      videoUrl: 'https://igbxyvhkcaynscxmouyw.supabase.co/storage/v1/object/public/story-videos/WhatsApp%20Video%202026-03-25%20at%2023.48.03.mp4',
      order: 2,
    },
    {
      title: 'PRÊMIOS',
      videoUrl: 'https://igbxyvhkcaynscxmouyw.supabase.co/storage/v1/object/public/story-videos/WhatsApp%20Video%202026-03-25%20at%2023.48.22.mp4',
      order: 3,
    },
    {
      title: 'CASHBACK',
      videoUrl: 'https://igbxyvhkcaynscxmouyw.supabase.co/storage/v1/object/public/story-videos/WhatsApp%20Video%202026-03-25%20at%2023.48.23.mp4',
      order: 4,
    },
    {
      title: 'GRÁTIS',
      videoUrl: 'https://igbxyvhkcaynscxmouyw.supabase.co/storage/v1/object/public/story-videos/WhatsApp%20Video%202026-03-25%20at%2023.50.15.mp4',
      order: 5,
    },
  ]

  // First, find existing stories avoiding duplicates
  for (const story of stories) {
    const existing = await prisma.story.findFirst({
      where: { title: story.title },
    })

    if (existing) {
      await prisma.story.update({
        where: { id: existing.id },
        data: story,
      })
    } else {
      await prisma.story.create({
        data: story,
      })
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
