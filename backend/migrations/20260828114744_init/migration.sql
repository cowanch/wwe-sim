-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('RAW', 'SMACKDOWN', 'NXT');

-- CreateEnum
CREATE TYPE "Division" AS ENUM ('MAIN_EVENT', 'MID_CARD', 'WOMENS', 'TAG_TEAM');

-- CreateEnum
CREATE TYPE "Phase" AS ENUM ('EXHIBITION', 'CONTENDER', 'PPV', 'TOURNAMENT');

-- CreateTable
CREATE TABLE "Superstar" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "overall" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "Superstar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagTeam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TagTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagTeamMembership" (
    "superstarId" INTEGER NOT NULL,
    "tagTeamId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "TagTeamMembership_pkey" PRIMARY KEY ("superstarId","tagTeamId")
);

-- CreateTable
CREATE TABLE "Championship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" "Brand" NOT NULL,
    "division" "Division" NOT NULL,

    CONSTRAINT "Championship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "brands" "Brand"[],

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MatchType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "phase" "Phase" NOT NULL,
    "matchTypeId" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchSide" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "tagTeamId" INTEGER,
    "winner" BOOLEAN NOT NULL,

    CONSTRAINT "MatchSide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchSideChampionship" (
    "matchSideId" INTEGER NOT NULL,
    "championshipId" INTEGER NOT NULL,
    "defending" BOOLEAN NOT NULL,

    CONSTRAINT "MatchSideChampionship_pkey" PRIMARY KEY ("matchSideId","championshipId")
);

-- CreateTable
CREATE TABLE "BrandMembership" (
    "id" SERIAL NOT NULL,
    "superstarId" INTEGER,
    "tagTeamId" INTEGER,
    "brand" "Brand" NOT NULL,
    "division" "Division" NOT NULL,
    "startMatchId" INTEGER NOT NULL,
    "endMatchId" INTEGER,

    CONSTRAINT "BrandMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentMatch" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "matchNumber" INTEGER NOT NULL,

    CONSTRAINT "TournamentMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentSeed" (
    "tournamentId" INTEGER NOT NULL,
    "superstarId" INTEGER,
    "tagTeamId" INTEGER,
    "seedNumber" INTEGER NOT NULL,

    CONSTRAINT "TournamentSeed_pkey" PRIMARY KEY ("tournamentId","seedNumber")
);

-- CreateTable
CREATE TABLE "_MatchSideToSuperstar" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MatchSideToSuperstar_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagTeamMembership_superstarId_key" ON "TagTeamMembership"("superstarId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchSide_id_matchId_key" ON "MatchSide"("id", "matchId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchSideChampionship_matchSideId_key" ON "MatchSideChampionship"("matchSideId");

-- CreateIndex
CREATE UNIQUE INDEX "BrandMembership_startMatchId_key" ON "BrandMembership"("startMatchId");

-- CreateIndex
CREATE UNIQUE INDEX "BrandMembership_endMatchId_key" ON "BrandMembership"("endMatchId");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentMatch_matchId_key" ON "TournamentMatch"("matchId");

-- CreateIndex
CREATE INDEX "_MatchSideToSuperstar_B_index" ON "_MatchSideToSuperstar"("B");

-- AddForeignKey
ALTER TABLE "TagTeamMembership" ADD CONSTRAINT "TagTeamMembership_superstarId_fkey" FOREIGN KEY ("superstarId") REFERENCES "Superstar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagTeamMembership" ADD CONSTRAINT "TagTeamMembership_tagTeamId_fkey" FOREIGN KEY ("tagTeamId") REFERENCES "TagTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_matchTypeId_fkey" FOREIGN KEY ("matchTypeId") REFERENCES "MatchType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSide" ADD CONSTRAINT "MatchSide_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSide" ADD CONSTRAINT "MatchSide_tagTeamId_fkey" FOREIGN KEY ("tagTeamId") REFERENCES "TagTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSideChampionship" ADD CONSTRAINT "MatchSideChampionship_matchSideId_fkey" FOREIGN KEY ("matchSideId") REFERENCES "MatchSide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSideChampionship" ADD CONSTRAINT "MatchSideChampionship_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "Championship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandMembership" ADD CONSTRAINT "BrandMembership_superstarId_fkey" FOREIGN KEY ("superstarId") REFERENCES "Superstar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandMembership" ADD CONSTRAINT "BrandMembership_tagTeamId_fkey" FOREIGN KEY ("tagTeamId") REFERENCES "TagTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandMembership" ADD CONSTRAINT "BrandMembership_startMatchId_fkey" FOREIGN KEY ("startMatchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandMembership" ADD CONSTRAINT "BrandMembership_endMatchId_fkey" FOREIGN KEY ("endMatchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentMatch" ADD CONSTRAINT "TournamentMatch_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentMatch" ADD CONSTRAINT "TournamentMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentSeed" ADD CONSTRAINT "TournamentSeed_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentSeed" ADD CONSTRAINT "TournamentSeed_superstarId_fkey" FOREIGN KEY ("superstarId") REFERENCES "Superstar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentSeed" ADD CONSTRAINT "TournamentSeed_tagTeamId_fkey" FOREIGN KEY ("tagTeamId") REFERENCES "TagTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchSideToSuperstar" ADD CONSTRAINT "_MatchSideToSuperstar_A_fkey" FOREIGN KEY ("A") REFERENCES "MatchSide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchSideToSuperstar" ADD CONSTRAINT "_MatchSideToSuperstar_B_fkey" FOREIGN KEY ("B") REFERENCES "Superstar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
