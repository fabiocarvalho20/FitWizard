/*
  Warnings:

  - You are about to drop the column `workout` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `UserInput` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserInput` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "workout";

-- CreateIndex
CREATE UNIQUE INDEX "UserInput_id_key" ON "UserInput"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInput_userId_key" ON "UserInput"("userId");
