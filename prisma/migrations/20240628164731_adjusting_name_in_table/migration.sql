/*
  Warnings:

  - You are about to drop the column `scheduledFor` on the `schedules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "scheduledFor",
ADD COLUMN     "scheduled_for" TEXT;
