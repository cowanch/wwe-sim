/*
  Warnings:

  - Changed the type of `week` on the `Ppv` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `day` on the `Ppv` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WeekOfMonth" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'LAST');

-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "Ppv" DROP COLUMN "week",
ADD COLUMN     "week" "WeekOfMonth" NOT NULL,
DROP COLUMN "day",
ADD COLUMN     "day" "Weekday" NOT NULL;
