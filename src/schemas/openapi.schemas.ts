export const GameSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    homeTeam: { type: 'string' },
    awayTeam: { type: 'string' },
    oddsHome: { type: 'number' },
    oddsDraw: { type: 'number' },
    oddsAway: { type: 'number' },
    status: { type: 'string', enum: ['OPEN', 'IN_PROGRESS', 'FINISHED', 'CANCELLED'] },
    startsAt: { type: 'string', format: 'date-time' },
    createdAt: { type: 'string', format: 'date-time' },
  },
} as const

export const TokenResponseSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  },
} as const

export const ErrorSchema = {
  type: 'object',
  properties: {
    error: { type: 'string' },
  },
} as const

export const BalanceSchema = {
  type: 'object',
  properties: {
    balance: { type: 'number' },
  },
} as const

export const DepositSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    userId: { type: 'string', format: 'uuid' },
    amount: { type: 'number' },
    status: { type: 'string', enum: ['PENDING', 'COMPLETED'] },
    pixCode: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    completedAt: { type: 'string', format: 'date-time', nullable: true },
  },
} as const

export const CasinoGameSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    provider: { type: 'string' },
    category: { type: 'string', enum: ['SLOTS', 'CRASH', 'ROULETTE', 'BLACKJACK'] },
    sections: { type: 'array', items: { type: 'string' } },
    badge: { type: 'string', nullable: true },
    multiplier: { type: 'string', nullable: true },
    accent: { type: 'string', nullable: true },
    thumbnail: { type: 'string', nullable: true },
    active: { type: 'boolean' },
    createdAt: { type: 'string', format: 'date-time' },
  },
} as const

export const CasinoGameListSchema = {
  type: 'object',
  properties: {
    data: { type: 'array', items: CasinoGameSchema },
    total: { type: 'integer' },
    page: { type: 'integer' },
    limit: { type: 'integer' },
  },
} as const
