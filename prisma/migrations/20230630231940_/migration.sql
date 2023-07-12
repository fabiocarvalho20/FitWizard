/*
  Warnings:

  - Changed the type of `diet` on the `Diet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "diet",
ADD COLUMN     "diet" JSONB NOT NULL;
