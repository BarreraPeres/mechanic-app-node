/*
  Warnings:

  - You are about to drop the column `type` on the `order_services` table. All the data in the column will be lost.
  - Added the required column `type` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('MAINTENANCE', 'REPAIR', 'INSPECTION');

-- AlterTable
ALTER TABLE "order_services" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "type" "Type" NOT NULL;
