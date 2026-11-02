/*
  Warnings:

  - Added the required column `isChampionship` to the `Title` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Title" ADD COLUMN     "isChampionship" BOOLEAN NOT NULL;
