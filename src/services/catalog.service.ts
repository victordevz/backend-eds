import { GameCategory, Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'

const VALID_CATEGORIES = Object.values(GameCategory)

interface ListParams {
  category?: string
  provider?: string
  section?: string
  page: number
  limit: number
}

export async function listCasinoGames({ category, provider, section, page, limit }: ListParams) {
  const where: Prisma.CasinoGameWhereInput = { active: true }

  if (category) {
    const upper = category.toUpperCase() as GameCategory
    if (!VALID_CATEGORIES.includes(upper)) {
      throw new Error('INVALID_CATEGORY')
    }
    where.category = upper
  }

  if (provider) {
    where.provider = { contains: provider, mode: 'insensitive' }
  }

  if (section) {
    where.sections = { has: section }
  }

  const skip = (page - 1) * limit

  const [data, total] = await prisma.$transaction([
    prisma.casinoGame.findMany({ where, skip, take: limit, orderBy: { createdAt: 'asc' } }),
    prisma.casinoGame.count({ where }),
  ])

  return { data, total, page, limit }
}
