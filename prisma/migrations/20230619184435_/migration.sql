/*
  Warnings:

  - Added the required column `age` to the `UserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boneDensity` to the `UserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatMass` to the `UserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `UserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal` to the `UserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heigth` to the `UserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hydration` to the `UserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leanMass` to the `UserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscleMass` to the `UserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmb` to the `UserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visceralFat` to the `UserInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weigth` to the `UserInput` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserInput" ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "boneDensity" TEXT NOT NULL,
ADD COLUMN     "fatMass" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "goal" TEXT NOT NULL,
ADD COLUMN     "heigth" TEXT NOT NULL,
ADD COLUMN     "hydration" TEXT NOT NULL,
ADD COLUMN     "leanMass" TEXT NOT NULL,
ADD COLUMN     "muscleMass" TEXT NOT NULL,
ADD COLUMN     "tmb" TEXT NOT NULL,
ADD COLUMN     "visceralFat" TEXT NOT NULL,
ADD COLUMN     "weigth" TEXT NOT NULL;
