import OpenAI from 'openai'
import { prisma } from '../lib/prisma'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `Você é o assistente de suporte da EDS Apostas, uma casa de apostas esportivas e cassino online.
Seu papel é ajudar os usuários com:
- Recuperação de valores (saques não processados, dinheiro não creditado após depósito)
- Contestação de odds (odds incorretas, divergência entre odds exibidas e aplicadas)
- Regras das apostas (mercados disponíveis, como funcionam as apostas ao vivo, regras de cancelamento)
- Dúvidas sobre jogos de cassino (regras dos jogos, como funcionam slots, crash, roleta, blackjack)
- Problemas com depósitos e saques via PIX
- Informações sobre promoções e bônus
- Verificação de conta e documentação

Seja direto, empático e profissional. Se não puder resolver o problema do usuário diretamente, informe que um atendente humano irá contatar em até 24 horas.
Nunca invente informações sobre saldos, apostas ou transações específicas do usuário — você não tem acesso a esses dados.
Responda sempre em português do Brasil.`

export async function createSession(userId: string) {
  return prisma.supportSession.create({
    data: { userId },
    select: { id: true, userId: true, createdAt: true },
  })
}

export async function listSessions(userId: string) {
  return prisma.supportSession.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: { id: true, userId: true, createdAt: true },
  })
}

export async function getMessages(sessionId: string, userId: string) {
  const session = await prisma.supportSession.findUnique({ where: { id: sessionId } })
  if (!session || session.userId !== userId) {
    throw new Error('SESSION_NOT_FOUND')
  }

  return prisma.supportMessage.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'asc' },
    select: { id: true, sessionId: true, role: true, content: true, createdAt: true },
  })
}

export async function sendMessage(sessionId: string, userId: string, content: string) {
  const session = await prisma.supportSession.findUnique({ where: { id: sessionId } })
  if (!session || session.userId !== userId) {
    throw new Error('SESSION_NOT_FOUND')
  }

  const history = await prisma.supportMessage.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'asc' },
    select: { role: true, content: true },
  })

  await prisma.supportMessage.create({
    data: { sessionId, role: 'USER', content },
  })

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map((msg) => ({
      role: msg.role === 'USER' ? ('user' as const) : ('assistant' as const),
      content: msg.content,
    })),
    { role: 'user', content },
  ]

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
  })

  const assistantContent = completion.choices[0]?.message?.content
  if (!assistantContent) {
    throw new Error('OPENAI_EMPTY_RESPONSE')
  }

  const assistantMessage = await prisma.supportMessage.create({
    data: { sessionId, role: 'ASSISTANT', content: assistantContent },
    select: { id: true, sessionId: true, role: true, content: true, createdAt: true },
  })

  return assistantMessage
}
