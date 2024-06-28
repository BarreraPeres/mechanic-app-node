/*
  Warnings:

  - You are about to drop the column `user_Id` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_id` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_scheduling_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_vehicle_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_user_Id_fkey";

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "vehicle_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "user_Id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "services";

-- CreateTable
CREATE TABLE "order_services" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "value" INTEGER NOT NULL,
    "description" TEXT,
    "vehicle_id" TEXT NOT NULL,
    "scheduling_id" TEXT,

    CONSTRAINT "order_services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_services_scheduling_id_key" ON "order_services"("scheduling_id");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_services" ADD CONSTRAINT "order_services_scheduling_id_fkey" FOREIGN KEY ("scheduling_id") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
