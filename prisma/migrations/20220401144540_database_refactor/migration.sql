/*
  Warnings:

  - You are about to drop the column `attempt_number` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `cohortId` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `CurriculumModule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CurriculumTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LmsUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assignmentId` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attemptNumber` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluation_date` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submit_date` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curriculumId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleVersionId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('student', 'teacher');

-- CreateEnum
CREATE TYPE "taskType" AS ENUM ('info', 'code');

-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_taskId_cohortId_fkey";

-- DropForeignKey
ALTER TABLE "CurriculumModule" DROP CONSTRAINT "CurriculumModule_cohortId_fkey";

-- DropForeignKey
ALTER TABLE "CurriculumTask" DROP CONSTRAINT "CurriculumTask_moduleId_cohortId_fkey";

-- DropForeignKey
ALTER TABLE "LmsUser" DROP CONSTRAINT "LmsUser_cohortId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_moduleId_fkey";

-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "attempt_number",
DROP COLUMN "cohortId",
DROP COLUMN "userId",
ADD COLUMN     "assignmentId" TEXT NOT NULL,
ADD COLUMN     "attemptNumber" INTEGER NOT NULL,
ADD COLUMN     "evaluation_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "submit_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "moduleId",
ADD COLUMN     "curriculumId" TEXT NOT NULL,
ADD COLUMN     "moduleVersionId" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "taskType" NOT NULL;

-- DropTable
DROP TABLE "CurriculumModule";

-- DropTable
DROP TABLE "CurriculumTask";

-- DropTable
DROP TABLE "LmsUser";

-- CreateTable
CREATE TABLE "Profile" (
    "login" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "providerAccountId" TEXT
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "cohortId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "userRole" NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleVersion" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "version_number" INTEGER NOT NULL,

    CONSTRAINT "ModuleVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curriculum" (
    "id" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "moduleProgress" TEXT NOT NULL,

    CONSTRAINT "Curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_login_key" ON "Profile"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Curriculum_assignmentId_key" ON "Curriculum"("assignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerAccountId_key" ON "Account"("providerAccountId");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "Cohort"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleVersion" ADD CONSTRAINT "ModuleVersion_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_moduleVersionId_fkey" FOREIGN KEY ("moduleVersionId") REFERENCES "ModuleVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curriculum" ADD CONSTRAINT "Curriculum_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
