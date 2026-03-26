/*
  Warnings:

  - Added the required column `gameUrl` to the `CasinoGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CasinoGame" ADD COLUMN     "gameUrl" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT;
