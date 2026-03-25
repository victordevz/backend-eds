import { randomUUID } from 'crypto'
import { prisma } from '../lib/prisma'

const MIN_AMOUNT = 0.01
const MAX_AMOUNT = 10000

export async function createDeposit(userId: string, amount: number) {
  if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    throw new Error('INVALID_AMOUNT')
  }

  const deposit = await prisma.deposit.create({
    data: {
      userId,
      amount,
      pixCode: randomUUID(),
    },
  })

  setTimeout(() => confirmDeposit(deposit.id, userId, amount), 2000)

  return deposit
}

async function confirmDeposit(depositId: string, userId: string, amount: number) {
  await prisma.$transaction([
    prisma.deposit.update({
      where: { id: depositId },
      data: { status: 'COMPLETED', completedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: amount } },
    }),
  ])
}

export async function getDeposit(depositId: string, userId: string) {
  const deposit = await prisma.deposit.findUnique({ where: { id: depositId } })
  if (!deposit || deposit.userId !== userId) {
    throw new Error('DEPOSIT_NOT_FOUND')
  }
  return deposit
}

export async function getBalance(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { balance: true },
  })
  if (!user) {
    throw new Error('USER_NOT_FOUND')
  }
  return user
}
