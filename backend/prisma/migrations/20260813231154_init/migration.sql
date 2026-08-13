-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "Superstar" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "overall" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "Superstar_pkey" PRIMARY KEY ("id")
);
