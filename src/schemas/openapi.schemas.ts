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
