import { prisma } from "./prisma";

export async function createCard(
  userId: string,
  title: string,
  content: string,
  type: string,
) {
  return await prisma.card.create({
    data: {
      title,
      type,
      content,
      userId,
    },
  });
}

export async function getCardsByUser(userId: string) {
  return await prisma.card.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCardById(cardId: string, userId: string) {
  return await prisma.card.findFirst({
    where: {
      id: cardId,
      userId,
    },
  });
}
export async function deleteAllCardsForUser(userId: string) {
  return await prisma.card.deleteMany({
    where: { userId },
  });
}

export async function updateCard(
  cardId: string,
  userId: string,
  data: { title?: string; content?: string },
) {
  return await prisma.card.updateMany({
    where: {
      id: cardId,
      userId,
    },
    data,
  });
}

export async function deleteCard(cardId: string, userId: string) {
  return await prisma.card.deleteMany({
    where: {
      id: cardId,
      userId,
    },
  });
}

export async function deleteCardByTitle(title: string, userId: string) {
  try {
    const deleted = await prisma.card.deleteMany({
      where: {
        title,
        userId,
      },
    });

    return deleted; // { count: number }
  } catch (err) {
    console.error("Error deleting card:", err);
    throw new Error("Failed to delete card");
  }
}
