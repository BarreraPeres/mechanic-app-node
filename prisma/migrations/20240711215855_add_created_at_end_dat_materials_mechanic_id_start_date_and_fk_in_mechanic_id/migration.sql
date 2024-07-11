/*
  Warnings:

  - You are about to drop the column `createdAt` on the `order_services` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `order_services` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `order_services` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `order_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `order_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mechanic_id` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_services" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "materials" TEXT,
ADD COLUMN     "mechanic_id" TEXT,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "mechanic_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "mechanics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "mechanics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_mechanic_id_fkey" FOREIGN KEY ("mechanic_id") REFERENCES "mechanics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_services" ADD CONSTRAINT "order_services_mechanic_id_fkey" FOREIGN KEY ("mechanic_id") REFERENCES "mechanics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
