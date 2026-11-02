/*
  Warnings:

  - You are about to drop the `Championship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MatchChampionship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MatchSideChampionship` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `titleId` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MatchChampionship" DROP CONSTRAINT "MatchChampionship_championshipId_fkey";

-- DropForeignKey
ALTER TABLE "MatchChampionship" DROP CONSTRAINT "MatchChampionship_matchId_fkey";

-- DropForeignKey
ALTER TABLE "MatchSideChampionship" DROP CONSTRAINT "MatchSideChampionship_championshipId_fkey";

-- DropForeignKey
ALTER TABLE "MatchSideChampionship" DROP CONSTRAINT "MatchSideChampionship_matchSideId_fkey";

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "titleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Championship";

-- DropTable
DROP TABLE "MatchChampionship";

-- DropTable
DROP TABLE "MatchSideChampionship";

-- CreateTable
CREATE TABLE "Title" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" "Brand",
    "division" "Division",

    CONSTRAINT "Title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchTitle" (
    "matchId" INTEGER NOT NULL,
    "titleId" INTEGER NOT NULL,

    CONSTRAINT "MatchTitle_pkey" PRIMARY KEY ("matchId","titleId")
);

-- CreateTable
CREATE TABLE "MatchSideTitle" (
    "matchSideId" INTEGER NOT NULL,
    "titleId" INTEGER NOT NULL,

    CONSTRAINT "MatchSideTitle_pkey" PRIMARY KEY ("matchSideId","titleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatchTitle_matchId_key" ON "MatchTitle"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchSideTitle_matchSideId_key" ON "MatchSideTitle"("matchSideId");

-- AddForeignKey
ALTER TABLE "MatchTitle" ADD CONSTRAINT "MatchTitle_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTitle" ADD CONSTRAINT "MatchTitle_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSideTitle" ADD CONSTRAINT "MatchSideTitle_matchSideId_fkey" FOREIGN KEY ("matchSideId") REFERENCES "MatchSide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSideTitle" ADD CONSTRAINT "MatchSideTitle_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
