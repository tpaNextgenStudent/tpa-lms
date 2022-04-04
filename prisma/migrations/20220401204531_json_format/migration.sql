/*
  Warnings:

  - Changed the type of `moduleProgress` on the `Curriculum` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Curriculum" DROP COLUMN "moduleProgress",
ADD COLUMN     "moduleProgress" JSONB NOT NULL;
