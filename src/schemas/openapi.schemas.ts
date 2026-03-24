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
