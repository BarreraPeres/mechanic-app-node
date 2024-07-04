/*
  Warnings:

  - Added the required column `scheduled_for` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "scheduled_for",
ADD COLUMN     "scheduled_for" TIMESTAMP(3) NOT NULL;
