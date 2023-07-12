/*
  Warnings:

  - You are about to drop the column `boneDensity` on the `UserInput` table. All the data in the column will be lost.
  - You are about to drop the column `hydration` on the `UserInput` table. All the data in the column will be lost.
  - You are about to drop the column `leanMass` on the `UserInput` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserInput_userId_key";

-- AlterTable
ALTER TABLE "UserInput" DROP COLUMN "boneDensity",
DROP COLUMN "hydration",
DROP COLUMN "leanMass";
