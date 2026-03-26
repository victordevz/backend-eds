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

  await prisma.casinoGame.createMany({
    data: [
      {
        title: 'Gates of Olympus',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['featured', 'popular'],
        badge: 'EM DESTAQUE',
        multiplier: '5000x',
        accent: '#7C3AED',
      },
      {
        title: 'Sweet Bonanza',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['featured', 'popular'],
        badge: 'NOVO',
        multiplier: '21100x',
        accent: '#EC4899',
      },
      {
        title: 'Aviator',
        provider: 'Spribe',
        category: 'CRASH',
        sections: ['featured'],
        badge: 'POPULAR',
        multiplier: '1000000x',
        accent: '#EF4444',
      },
      {
        title: 'Fortune Tiger',
        provider: 'PG Soft',
        category: 'SLOTS',
        sections: ['popular'],
        accent: '#F59E0B',
      },
      {
        title: 'Fortune Ox',
        provider: 'PG Soft',
        category: 'SLOTS',
        sections: ['popular'],
        accent: '#F59E0B',
      },
      {
        title: 'Fortune Mouse',
        provider: 'PG Soft',
        category: 'SLOTS',
        sections: ['popular'],
        accent: '#F59E0B',
      },
      {
        title: 'Fortune Rabbit',
        provider: 'PG Soft',
        category: 'SLOTS',
        sections: ['popular'],
        accent: '#F59E0B',
      },
      {
        title: 'Big Bass Splash',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['popular'],
        accent: '#3B82F6',
      },
      {
        title: 'Dog House',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['popular'],
        accent: '#F97316',
      },
      {
        title: 'Starlight Princess',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['new'],
        accent: '#A855F7',
      },
      {
        title: 'Sugar Rush',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['new'],
        accent: '#EC4899',
      },
      {
        title: 'Zeus vs Hades',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['new'],
        accent: '#6366F1',
      },
      {
        title: 'Wisdom of Athena',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['new'],
        accent: '#0EA5E9',
      },
      {
        title: 'Wild West Gold',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['new'],
        accent: '#D97706',
      },
      {
        title: 'Gems Bonanza',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['new'],
        accent: '#10B981',
      },
      {
        title: 'Might of Ra',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['new'],
        accent: '#F59E0B',
      },
      {
        title: 'Chilli Heat',
        provider: 'Pragmatic Play',
        category: 'SLOTS',
        sections: ['new'],
        accent: '#EF4444',
      },
      {
        title: 'Spaceman',
        provider: 'Pragmatic Play',
        category: 'CRASH',
        sections: [],
        accent: '#6366F1',
      },
      {
        title: 'Mines',
        provider: 'Spribe',
        category: 'CRASH',
        sections: [],
        accent: '#10B981',
      },
      {
        title: 'Plinko',
        provider: 'Spribe',
        category: 'CRASH',
        sections: [],
        accent: '#F59E0B',
      },
      {
        title: 'Goal',
        provider: 'Spribe',
        category: 'CRASH',
        sections: [],
        accent: '#22C55E',
      },
      {
        title: 'Keno',
        provider: 'Spribe',
        category: 'CRASH',
        sections: [],
        accent: '#8B5CF6',
      },
      {
        title: 'Dice',
        provider: 'EvoPlay',
        category: 'CRASH',
        sections: [],
        accent: '#3B82F6',
      },
      {
        title: 'Hi-Lo',
        provider: 'EvoPlay',
        category: 'CRASH',
        sections: [],
        accent: '#EF4444',
      },
    ],
    skipDuplicates: true,
  })

  await prisma.story.createMany({
    data: [
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
    ],
    skipDuplicates: true,
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
  .catch(console.error)
  .finally(() => prisma.$disconnect())
