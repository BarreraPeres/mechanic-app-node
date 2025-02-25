/*
  Warnings:

  - The `status` column on the `order_services` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `schedules` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'SCHEDULED', 'FINISHED');

-- AlterTable
ALTER TABLE "order_services" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';