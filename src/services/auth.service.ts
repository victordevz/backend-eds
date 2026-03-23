import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma'

const SALT_ROUNDS = 12

export async function createUser(email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw new Error('EMAIL_TAKEN')
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
  return prisma.user.create({ data: { email, passwordHash } })
}

export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error('INVALID_CREDENTIALS')
  }
  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    throw new Error('INVALID_CREDENTIALS')
  }
  return user
}
