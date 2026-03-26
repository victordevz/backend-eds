import { prisma } from '../lib/prisma'

export async function listStories(userId: string) {
  const stories = await prisma.story.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
    include: {
      views: {
        where: { userId },
        select: { id: true },
      },
    },
  })

  return stories.map(({ views, ...story }) => ({
    ...story,
    viewed: views.length > 0,
  }))
}

export async function markAsViewed(storyId: string, userId: string) {
  const story = await prisma.story.findUnique({ where: { id: storyId } })
  if (!story || !story.active) {
    throw new Error('STORY_NOT_FOUND')
  }

  await prisma.storyView.upsert({
    where: { storyId_userId: { storyId, userId } },
    update: {},
    create: { storyId, userId },
  })
}
