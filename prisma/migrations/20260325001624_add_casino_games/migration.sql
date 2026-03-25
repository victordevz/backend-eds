-- CreateEnum
CREATE TYPE "GameCategory" AS ENUM ('SLOTS', 'CRASH', 'ROULETTE', 'BLACKJACK');

-- CreateTable
CREATE TABLE "CasinoGame" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "category" "GameCategory" NOT NULL,
    "sections" TEXT[],
    "badge" TEXT,
    "multiplier" TEXT,
    "accent" TEXT,
    "thumbnail" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CasinoGame_pkey" PRIMARY KEY ("id")
);
